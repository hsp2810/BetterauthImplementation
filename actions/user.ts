"use server";

import { db } from "@/db";
import { account, notification, request, user, userFollow } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  UserEditSchema,
  UserUsernameSchema,
  ForgotPasswordPasswordSchema,
} from "@/lib/validators/zod";
import { RequestsWithUser, User } from "@/types";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

type ActionResult = { success: string } | { error: string };

export const actionProfileUpdate = async (
  values: UserEditSchema,
  id: string
): Promise<ActionResult> => {
  try {
    const updatedUser = await db
      .update(user)
      .set(values)
      .where(eq(user.id, id));

    if (!updatedUser) {
      return { error: "Some error occured while updating the profile!" };
    }

    return { success: "Profile updated successfully!" };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionUpdatePassword = async (
  values: ForgotPasswordPasswordSchema
): Promise<ActionResult> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { error: "Session not found" };

    const updatedPassword = await db
      .update(account)
      .set({ password: values.password })
      .where(eq(account.userId, session.user.id));

    if (!updatedPassword) {
      return { error: "Some error occured while updating the password!" };
    }

    return {
      success:
        "Password updated successfully! Now you can login with Email and Password too!",
    };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionUserUsername = async (
  values: UserUsernameSchema,
  id: string
): Promise<ActionResult> => {
  try {
    const userExists = await db
      .select()
      .from(user)
      .where(eq(user.username, values.username));
    if (userExists[0]) {
      return {
        error: "Username already exists! Please choose a different one!",
      };
    }

    const updatedUser = await db
      .update(user)
      .set(values)
      .where(eq(user.id, id));

    if (!updatedUser) {
      return { error: "Some error occured while updating the username!" };
    }

    return { success: "Username updated successfully!" };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionUserDelete = async (id: string): Promise<ActionResult> => {
  try {
    const deletedUser = await db.delete(user).where(eq(user.id, id));

    if (!deletedUser) {
      return { error: "Some error occured while deleting the user!" };
    }

    return { success: "Account deleted successfully!" };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionAdminDemote = async (id: string): Promise<ActionResult> => {
  try {
    const updatedUser = await db
      .update(user)
      .set({ role: "user" })
      .where(eq(user.id, id));

    if (!updatedUser) {
      return { error: "Some error occured while updating the user!" };
    }

    return {
      success:
        "You are demoted! Only an admin can promote you now or you can request to become one!",
    };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionAdminRequest = async (
  userId: string,
  message: string
): Promise<ActionResult> => {
  try {
    const newRequest = await db
      .insert(request)
      .values({
        id: crypto.randomUUID(),
        userId,
        userMessage: message,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      })
      .returning();

    if (!newRequest) {
      return { error: "Some error occured while sending the request!" };
    }

    const updatedUser = await db
      .update(user)
      .set({ adminRequested: true })
      .where(eq(user.id, userId));

    if (!updatedUser) {
      return { error: "Some error occured while sending the request!" };
    }

    return { success: "Request sent!" };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionAdminRequestResponse = async (
  req: RequestsWithUser,
  response: boolean
): Promise<ActionResult> => {
  try {
    const deletedRequest = await db
      .delete(request)
      .where(eq(request.id, req.id));
    if (!deletedRequest) {
      return { error: "Some error occured while deleting the request!" };
    }

    let updatedUser;
    if (response) {
      updatedUser = await db
        .update(user)
        .set({ adminRequested: false, role: "admin" })
        .where(eq(user.id, req.user.id));
    } else {
      updatedUser = await db
        .update(user)
        .set({ adminRequested: false })
        .where(eq(user.id, req.user.id));
    }

    if (!updatedUser) {
      return { error: "Some error occured while updating the user!" };
    }

    if (response) {
      return { success: "User has been assigned the admin role" };
    } else {
      return { success: "Request revoked successfully" };
    }
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionFollowUser = async (
  sender: User,
  receiver: User
): Promise<ActionResult> => {
  try {
    if (receiver.user_type === "public") {
      const follow = await db
        .insert(userFollow)
        .values({
          followerId: sender.id,
          followingId: receiver.id,
        })
        .returning();

      if (!follow) {
        return {
          error: `Something went wrong in following the user ${receiver.username}`,
        };
      }
    } else {
      //Send a notification
      const newNotification = await db.insert(notification).values({
        id: crypto.randomUUID(),
        senderId: sender.id,
        receiverId: receiver.id,
        type: "follow_request",
        targetType: "user",
        targetId: sender.id,
      });
      if (!newNotification) {
        return {
          error: `Something went wrong in sending a follow request to ${receiver.username}`,
        };
      }

      return { success: `Follow request sent to ${receiver.username}` };
    }

    return { success: `You have started following ${receiver.username}` };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionUnFollowUser = async (
  userObj: User
): Promise<ActionResult> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { error: "Session not found" };
    }

    const dbUser = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id));

    if (!dbUser[0]) {
      return { error: "User not found!" };
    }

    const follow = await db
      .delete(userFollow)
      .where(
        and(
          eq(userFollow.followerId, session.user.id),
          eq(userFollow.followingId, userObj.id)
        )
      );

    if (!follow) {
      return {
        error: `Something went wrong in unfollowing the user ${userObj.username}`,
      };
    }

    return { success: `You are not following ${userObj.username} anymore!` };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};
