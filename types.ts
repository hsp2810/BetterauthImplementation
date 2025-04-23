import { InferSelectModel } from "drizzle-orm";
import { account, request, session, user } from "@/db/schema";

// Infer Drizzle types
export type User = InferSelectModel<typeof user>;
export type Account = InferSelectModel<typeof account>;
export type Session = InferSelectModel<typeof session>;
export type Request = InferSelectModel<typeof request>;

export type UserWithAccounts = User & {
  accounts: Account[];
};

export type UserWithAccountsAndSessions = User & {
  accounts: Account[];
  sessions: Session[];
};

export type RequestsWithUser = Request & {
  user: User;
};
