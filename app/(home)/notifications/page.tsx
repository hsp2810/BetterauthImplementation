import { db } from "@/db";
import { notification, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import NotificationCard from "@/modules/notifications/ui/notification-card";
import NotificationDeleteAllButton from "@/modules/notifications/ui/notification-delete-all-button";
import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

export default async function Notifications() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <h1>Session not found</h1>;

  const notifcationsFromDB = await db
    .select()
    .from(notification)
    .where(eq(notification.receiverId, session.user.id))
    .orderBy(desc(notification.createdAt));

  const loggedInUser = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));

  return (
    <div className='w-3/4 mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold'>Notifications</h1>
        {notifcationsFromDB.length > 0 && (
          <NotificationDeleteAllButton loggedInUserId={loggedInUser[0].id} />
        )}
      </div>

      <div className='flex flex-col gap-3'>
        {!notifcationsFromDB || notifcationsFromDB.length === 0 ? (
          <h2 className='text-sm text-muted-foreground'>No notifications</h2>
        ) : (
          notifcationsFromDB.map((notification) => {
            return (
              <NotificationCard
                notification={notification}
                key={notification.id}
                loggedInUser={loggedInUser[0]}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
