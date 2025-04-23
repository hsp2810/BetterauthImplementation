import { createInsertSchema } from "drizzle-zod";
import { user } from "@/db/schema";
import { z } from "zod";

export const userRegisterSchema = createInsertSchema(user)
  .extend({
    name: z.string().min(1, "Name cannot be empty"),
    email: z
      .string()
      .min(1, "Email cannot be empty")
      .email("Enter a valid email"),
    password: z.string().min(1, "Password cannot be empty"),
  })
  .pick({
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

export const userEditSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be blank" }),
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
export type ForgotPasswordEmailSchema = z.infer<
  typeof forgotPasswordEmailSchema
>;
export type ForgotPasswordPasswordSchema = z.infer<
  typeof forgotPasswordPasswordSchema
>;
