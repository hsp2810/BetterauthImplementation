import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import ProfileSection from "@/modules/profile/sections/profile-section";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import React from "react";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <h1>Session not found</h1>;

  const username = (await params).username;

  const searchedUser = await db
    .select()
    .from(user)
    .where(eq(user.username, username));

  const loggedInUser = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));

  return (
    <ProfileSection targetUser={searchedUser[0]} loggedInUser={loggedInUser[0]} />
  );
}
