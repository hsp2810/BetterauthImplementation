import { db } from "@/db";
import { account, session, user, userFollow } from "@/db/schema";
import { UserWithFollow } from "@/types";
import { eq } from "drizzle-orm";

export async function getUserWithAccountsAndSessions(userId: string) {
  const rows = await db
    .select({
      user: user,
      account: account,
      session: session,
    })
    .from(user)
    .leftJoin(account, eq(user.id, account.userId))
    .leftJoin(session, eq(user.id, session.userId))
    .where(eq(user.id, userId));

  if (!rows.length) return null;

  const baseUser = rows[0].user;

  const accounts: (typeof account.$inferSelect)[] = [];
  const sessions: (typeof session.$inferSelect)[] = [];

  for (const row of rows) {
    if (row.account && !accounts.find((a) => a.id === row.account!.id)) {
      accounts.push(row.account);
    }
    if (row.session && !sessions.find((s) => s.id === row.session!.id)) {
      sessions.push(row.session);
    }
  }

  return {
    ...baseUser,
    accounts,
    sessions,
  };
}

// Get followers
export const getFollowers = async (
  followingId: string
): Promise<UserWithFollow[]> => {
  return await db
    .select({
      user,
      userFollow,
    })
    .from(userFollow)
    .innerJoin(user, eq(userFollow.followerId, user.id))
    .where(eq(userFollow.followingId, followingId));
};

//Get following
export const getFollowing = async (
  followerId: string
): Promise<UserWithFollow[]> => {
  return await db
    .select({ user, userFollow })
    .from(userFollow)
    .innerJoin(user, eq(userFollow.followingId, user.id))
    .where(eq(userFollow.followerId, followerId));
};
