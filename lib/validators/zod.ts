import { createInsertSchema } from "drizzle-zod";
import { user } from "@/db/schema";
import { z } from "zod";

export const userRegisterSchema = createInsertSchema(user)
  .extend({
    username: z
      .string()
      .min(1, "Username cannot be empty")
      .max(10, { message: "Username cannot exceed 10 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),
    name: z.string().min(1, "Name cannot be empty"),
    email: z
      .string()
      .min(1, "Email cannot be empty")
      .email("Enter a valid email"),
    password: z.string().min(1, "Password cannot be empty"),
  })
  .pick({
    username: true,
    name: true,
    email: true,
    password: true,
  });

export const userLoginSchema = createInsertSchema(user)
  .extend({
    email: z
      .string()
      .min(1, "Email cannot be empty")
      .email("Enter a valid email"),
    password: z.string().min(1, "Password cannot be empty"),
  })
  .pick({
    email: true,
    password: true,
  });

export const userEditSchema = createInsertSchema(user)
  .extend({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    user_bio: z.string().max(50, { message: "Bio cannot exceed 50 letters" }),
    user_type: z.string(),
  })
  .pick({
    name: true,
    user_bio: true,
    user_type: true,
  });

export const userUsernameSchema = z.object({
  username: z
    .string()
    .min(1, "Username cannot be empty")
    .max(10, { message: "Username cannot exceed 10 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
});

export const forgotPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Enter a valid email"),
});

export const forgotPasswordPasswordSchema = z.object({
  password: z.string().min(1, "Password cannot be empty"),
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
export type UserLoginSchema = z.infer<typeof userLoginSchema>;
export type UserEditSchema = z.infer<typeof userEditSchema>;
export type UserUsernameSchema = z.infer<typeof userUsernameSchema>;
export type ForgotPasswordEmailSchema = z.infer<
  typeof forgotPasswordEmailSchema
>;
export type ForgotPasswordPasswordSchema = z.infer<
  typeof forgotPasswordPasswordSchema
>;
