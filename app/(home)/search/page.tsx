import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { SearchContainer } from "@/modules/home/ui/search/search-container";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export default async function SearchPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <h1>No session found</h1>;

  const loggedInUser = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));

  const allUsers = await db.select().from(user);

  const remainingUsers = allUsers.filter(
    (user) => user.id !== loggedInUser[0].id
  );
  return (
    <div className='w-3/4 mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Search Users</h1>
      <SearchContainer users={remainingUsers}/>
    </div>
  );
}
