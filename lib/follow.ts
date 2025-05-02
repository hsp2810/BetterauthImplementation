import { db } from "@/db";
import { notification, userFollow } from "@/db/schema";
import { Notification, UserFollow } from "@/types";
import { and, eq } from "drizzle-orm";

export async function checkFollowStatus(
  loggedInUserId: string,
  targetUserId: string
): Promise<"Following" | "Requested" | "Follow back" | "Follow"> {
  // 1. Check if logged-in user is already following the target user
  const [isFollowing] = await db
    .select()
    .from(userFollow)
    .where(
      and(
        eq(userFollow.followerId, loggedInUserId),
        eq(userFollow.followingId, targetUserId)
      )
    )
    .limit(1);

  if (isFollowing) return "Following";

  // 2. Check if a follow request (notification) has been sent
  const [hasRequested] = await db
    .select()
    .from(notification)
    .where(
      and(
        eq(notification.senderId, loggedInUserId),
        eq(notification.receiverId, targetUserId),
        eq(notification.type, "follow_request")
      )
    )
    .limit(1);

  if (hasRequested) return "Requested";

  // 3. Check if the target user is following the logged-in user (i.e., "Follow back" case)
  const [targetFollowsYou] = await db
    .select()
    .from(userFollow)
    .where(
      and(
        eq(userFollow.followerId, targetUserId),
        eq(userFollow.followingId, loggedInUserId)
      )
    )
    .limit(1);

  if (targetFollowsYou) return "Follow back";

  // 4. Default case: no relationship
  return "Follow";
}

export function checkFollowStatusClient(
  loggedInUserId: string,
  data: UserFollow[],
  targetUserId: string,
  notifications: Notification[]
): "Following" | "Requested" | "Follow back" | "Follow" {
  const isFollowing = data.some(
    (follow) =>
      follow.followerId === loggedInUserId &&
      follow.followingId === targetUserId
  );
  if (isFollowing) return "Following";

  const hasRequested = notifications.some(
    (notif) =>
      notif.senderId === loggedInUserId &&
      notif.receiverId === targetUserId &&
      notif.type === "follow_request"
  );
  if (hasRequested) return "Requested";

  const isFollowBack = data.some(
    (follow) =>
      follow.followerId === targetUserId &&
      follow.followingId === loggedInUserId
  );
  if (isFollowBack) return "Follow back";

  return "Follow";
}
