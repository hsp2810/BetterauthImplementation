"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { UserEditSchema } from "@/lib/validators/zod";
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

    return { success: "You are demoted! Only an admin can promote you now" };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};
