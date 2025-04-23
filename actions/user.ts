"use server";

import { db } from "@/db";
import { request, user } from "@/db/schema";
import { UserEditSchema } from "@/lib/validators/zod";
import { RequestsWithUser } from "@/types";
import { eq } from "drizzle-orm";

type ActionResult = { success: string } | { error: string };

export const actionUserEdit = async (
  values: UserEditSchema,
  id: string
): Promise<ActionResult> => {
  try {
    const updatedUser = await db
      .update(user)
      .set({ name: values.name })
      .where(eq(user.id, id));

    if (!updatedUser) {
      return { error: "Some error occured while updating the user!" };
    }

    return { success: "Account updated successfully!" };
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
