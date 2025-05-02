import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { account, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import SettingsForm from "@/modules/profile/ui/settings-form";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Settings() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <h1>Session not found</h1>;

  const userWithAccount = await db
    .select({
      user,
      account,
    })
    .from(account)
    .innerJoin(user, eq(account.userId, user.id))
    .where(eq(account.userId, session.user.id));

  const isPasswordSet = userWithAccount[0].account.password;

  return (
    <div className='w-3/4 mx-auto'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-bold'>Settings</h1>

        {!isPasswordSet ? (
          <div className='border border-card rounded-lg bg-card p-5 space-y-5'>
            <h3 className='font-semibold text-lg'>Set password</h3>
            <SettingsForm />
          </div>
        ) : (
          <div className='border border-card rounded-lg bg-card p-5 space-y-5'>
            <Link href={"/forgot-password"} className={cn(buttonVariants())}>
              Reset password
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
