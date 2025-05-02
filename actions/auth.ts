"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { UserLoginSchema, UserRegisterSchema } from "@/lib/validators/zod";
import { eq } from "drizzle-orm";

type ActionResult = { success: string } | { error: string };

export const actionRegister = async (
  values: UserRegisterSchema
): Promise<ActionResult> => {
  try {
    const { username, name, email, password } = values;

    const userExists = await db
      .select()
      .from(user)
      .where(eq(user.username, username));
    if (userExists[0]) {
      return {
        error: "Username already exists! Please choose a different one!",
      };
    }

    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || "Something went wrong. Please try again.",
      };
    }

    const data = await response.json();
    if (data?.error) {
      return { error: data.error.message || "Signup failed." };
    }

    return {
      success:
        "Account created successfully! Please verify the email to access the dashboard",
    };
  } catch (error) {
    return { error: "Unexpected error occurred. Please try again." };
  }
};

export const actionLogin = async (
  values: UserLoginSchema
): Promise<ActionResult> => {
  try {
    const { email, password } = values;

    const dbUser = await db.select().from(user).where(eq(user.email, email));
    if (!dbUser[0].emailVerified) {
      return {
        error: "Please verify your email address to access the application",
      };
    }

    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || "Something went wrong. Please try again.",
      };
    }

    const data = await response.json();
    if (data?.error) {
      return { error: data.error.message || "Signin failed." };
    }

    return { success: "Logged-in successfully!" };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Unexpected error occurred. Please try again." };
  }
};
