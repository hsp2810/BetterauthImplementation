import { db } from "@/db";
import { user } from "@/db/schema";
import { Notification, User } from "@/types";
import { eq } from "drizzle-orm";
import FollowRequestNotification from "./notification-types/notification-follow-request-card";
import FollowingNotification from "./notification-types/notification-following-card";
import { checkFollowStatus } from "@/lib/follow";

interface NotificationCardProps {
  notification: Notification;
  loggedInUser: User;
}

export default async function NotificationCard({
  notification,
  loggedInUser,
}: NotificationCardProps) {
  const sender = await db
    .select()
    .from(user)
    .where(eq(user.id, notification.senderId!));

  const currentFollowStatus = await checkFollowStatus(
    loggedInUser.id,
    sender[0].id
  );

  if (notification.type === "follow_request") {
    return (
      <FollowRequestNotification
        notification={notification}
        sender={sender[0]}
      />
    );
  } else if (notification.type === "following")
    return (
      <FollowingNotification
        loggedInUser={loggedInUser}
        notification={notification}
        sender={sender[0]}
        currentFollowStatus={currentFollowStatus}
      />
    );

  return <h1>Other type</h1>;
}
