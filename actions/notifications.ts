"use server";

import { db } from "@/db";
import { notification, user, userFollow } from "@/db/schema";
import { auth } from "@/lib/auth";
import { User } from "@/types";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

type ActionResult = { success: string } | { error: string };

export const actionAcceptFollowRequest = async (
  sender: User,
  notificationId: string
): Promise<ActionResult> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { error: "Session not found" };
    }

    //add the user to the following list
    const follow = await db
      .insert(userFollow)
      .values({
        followerId: sender.id,
        followingId: session.user.id,
      })
      .returning();

    if (!follow) {
      return {
        error: "Something went wrong",
      };
    }

    //delete the notification
    const deletedNotification = await db
      .delete(notification)
      .where(eq(notification.id, notificationId))
      .returning();
    if (!deletedNotification) {
      return {
        error: "Something went wrong",
      };
    }

    //Generate a new notification of following
    const newNotification = await db.insert(notification).values({
      id: crypto.randomUUID(),
      senderId: sender.id,
      receiverId: session.user.id,
      type: "following",
      targetType: "user",
      targetId: sender.id,
    });
    if (!newNotification) {
      return {
        error: "Something went wrong",
      };
    }

    return { success: "You have accepted the request" };
  } catch (error) {
    console.log(error);
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionDeleteFollowRequest = async (
  receiver: User
): Promise<ActionResult> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { error: "Session not found" };
    }

    //delete the notification
    const deletedNotification = await db
      .delete(notification)
      .where(
        and(
          eq(notification.senderId, session.user.id),
          eq(notification.receiverId, receiver.id),
          eq(notification.type, "follow_request")
        )
      )
      .returning();
    if (!deletedNotification) {
      return {
        error: "Something went wrong in cancelling the request",
      };
    }

    return { success: "Request cancelled" };
  } catch (error) {
    console.log(error);
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionDeleteNotification = async (
  id: string
): Promise<ActionResult> => {
  try {
    const deletedNotification = await db
      .delete(notification)
      .where(and(eq(notification.id, id)))
      .returning();
    if (!deletedNotification) {
      return {
        error: "Something went wrong in revoking the request",
      };
    }

    return { success: "Request revoked successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionDeleteAllNotifications = async (
  userId: string
): Promise<ActionResult> => {
  try {
    const deletedNotifications = await db
      .delete(notification)
      .where(eq(notification.receiverId, userId))
      .returning();
    if (!deletedNotifications) {
      return {
        error: "Something went wrong in deleting the notifications",
      };
    }

    return { success: "Notifications deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Unexpected error occurred. Please try again." };
  }
};
