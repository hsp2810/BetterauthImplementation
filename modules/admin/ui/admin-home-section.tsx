import React from "react";
import AdminUsersTable from "./admin-users-table";
import { db } from "@/db";
import { account, request, session, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RequestsWithUser, UserWithAccountsAndSessions } from "@/types";
import UserInfoCard from "@/modules/user/ui/user-info-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserWithAccountsAndSessions } from "@/modules/user/server";
import AdminRequestTable from "./admin-request-table";

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

  const requestRows = await db
    .select({
      request,
      user,
    })
    .from(request)
    .innerJoin(user, eq(user.id, request.userId));

  const requestMap = new Map<string, RequestsWithUser>();

  for (const row of requestRows) {
    const requestId = row.request.id;

    if (!requestMap.has(requestId)) {
      requestMap.set(requestId, {
        ...row.request,
        user: row.user,
      });
    }
  }

  const requests = Array.from(requestMap.values());

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl md:text-3xl'>Admin Console</h2>

      <div className='space-y-10 mt-5'>
        <div className='space-y-2'>
          <h3 className='font-semibold text-lg'>Users</h3>
          <AdminUsersTable users={usersWithAccountsAndSessions} />
        </div>

        <div className='space-y-2'>
          <h3 className='font-semibold text-lg'>Admin Requests</h3>
          <AdminRequestTable requests={requests} />
        </div>

        <div className='space-y-2 flex flex-col items-center'>
          <h3 className='font-semibold text-lg'>Your account</h3>
          <UserInfoCard user={loggedInAdmin} />
        </div>
      </div>
    </div>
  );
}
