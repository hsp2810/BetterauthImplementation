import { db } from "@/db";
import { user, account, session } from "@/db/schema";
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
