import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserWithAccountsAndSessions } from "../server";
import UserAdminApplicationCard from "./user-admin-application-card";
import UserInfoCard from "./user-info-card";

export default async function UserHomeSection() {
  const loggedInSession = await auth.api.getSession({
    headers: await headers(),
  });
  if (!loggedInSession) return <h1>Session not found</h1>;

  const loggedInUser = await getUserWithAccountsAndSessions(
    loggedInSession?.user.id
  );
  if (!loggedInUser) return <h1>User not found</h1>;

  return (
    <div className='mt-10 flex flex-col items-center'>
      <h2 className='font-bold text-3xl'>User Console</h2>

      <div className='space-y-2 mt-5'>
        <UserInfoCard user={loggedInUser} />
        <UserAdminApplicationCard user={loggedInUser} />
      </div>
    </div>
  );
}
