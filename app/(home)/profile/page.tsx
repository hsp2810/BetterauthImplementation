import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import ProfileSection from "@/modules/profile/sections/profile-section";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import React from "react";

export default async function LoggedInUserProfile() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <h1>User not logged in</h1>;

  const dbUser = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!dbUser) return <h1>User not found</h1>;

  return <ProfileSection targetUser={dbUser[0]} loggedInUser={dbUser[0]} />;
}
