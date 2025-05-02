import {
  account,
  notification,
  request,
  session,
  user,
  userFollow,
} from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

// Infer Drizzle types
export type User = InferSelectModel<typeof user>;
export type Account = InferSelectModel<typeof account>;
export type Session = InferSelectModel<typeof session>;
export type Request = InferSelectModel<typeof request>;
export type Notification = InferSelectModel<typeof notification>;
export type UserFollow = InferSelectModel<typeof userFollow>;

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

export type UserWithFollow = {
  user: User;
  userFollow: UserFollow;
};
