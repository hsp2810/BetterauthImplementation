import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { sendEmail, sendResetPasswordEmail } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      sendResetPasswordEmail(user.email, url);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    nextCookies(),
    admin({ adminUserIds: ["8PIa9CaS0lrDdPSLYMEEALTqBkPNaBxZ"] }),
  ],
  emailVerification: {
    sendVerificationEmail: async ({ user, url }, request) => {
      sendEmail(user.email, url);
    },
  },
});
