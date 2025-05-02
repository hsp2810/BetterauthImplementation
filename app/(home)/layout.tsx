import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { notification, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import HomeSidebar from "@/modules/home/ui/home-sidebar";
import Usernamecard from "@/modules/home/ui/username/username-card";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <h1>User not logged in</h1>;

  const dbUser = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!dbUser) return <h1>User not found</h1>;
  //check notifications
  const newNotifications = await db
    .select()
    .from(notification)
    .where(eq(notification.receiverId, session.user.id));

  if (!dbUser[0].username) {
    return <Usernamecard id={dbUser[0].id} />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <SidebarProvider>
        <HomeSidebar
          loggedInUser={dbUser[0]}
          notificationsLength={newNotifications.length}
        />
        <main className='flex-1'>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
