import React from "react";
import AdminUsersTable from "./admin-users-table";
import { db } from "@/db";
import { account, session, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UserWithAccountsAndSessions } from "@/types";
import UserInfoCard from "@/modules/user/ui/user-info-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserWithAccountsAndSessions } from "@/modules/user/server";

export default async function AdminHomeSection() {
  const rows = await db
    .select({
      user,
      account,
      session,
    })
    .from(user)
    .leftJoin(account, eq(user.id, account.userId))
    .leftJoin(session, eq(user.id, session.userId));

  if (!rows) return <h1>No users found</h1>;

  const userMap = new Map<string, UserWithAccountsAndSessions>();

  for (const row of rows) {
    const userId = row.user.id;
    if (!userMap.has(userId)) {
      userMap.set(userId, {
        ...row.user,
        accounts: row.account ? [row.account] : [],
        sessions: row.session ? [row.session] : [],
      });
    } else {
      const existing = userMap.get(userId)!;
      if (
        row.account &&
        !existing.accounts.find((a) => a.id === row.account!.id)
      ) {
        existing.accounts.push(row.account);
      }
      if (
        row.session &&
        !existing.sessions.find((s) => s.id === row.session!.id)
      ) {
        existing.sessions.push(row.session);
      }
    }
  }

  const usersWithAccountsAndSessions = Array.from(userMap.values());

  const currentSession = await auth.api.getSession({
    headers: await headers(),
  });
  if (!currentSession) return <h1>Session not found</h1>;

  const loggedInAdmin = await getUserWithAccountsAndSessions(
    currentSession.user.id
  );
  if (!loggedInAdmin) return <h1>User not found</h1>;

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-3xl'>Admin Console</h2>

      <div className='space-y-10 mt-5'>
        <div className='space-y-2'>
          <h3 className='font-semibold text-lg'>Users</h3>
          <AdminUsersTable users={usersWithAccountsAndSessions} />
        </div>

        <div className='space-y-2 flex flex-col items-center'>
          <h3 className='font-semibold text-lg'>Your account</h3>
          <UserInfoCard user={loggedInAdmin} />
        </div>
      </div>
    </div>
  );
}

export function getTimeUntil(targetDate: string | Date | number): string {
  const date = new Date(targetDate);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();

  if (diffMs <= 0) return "Already passed";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / 60);
  const hours = Math.floor(diffMs / (60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "A few seconds";
  if (minutes < 2) return "A minute";
  if (minutes < 60) return `${minutes} minutes`;
  if (hours < 2) return "An hour";
  if (hours < 24) return `${hours} hours`;
  if (days === 1) return "Tomorrow";
  if (days <= 90) return `${days} days`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
