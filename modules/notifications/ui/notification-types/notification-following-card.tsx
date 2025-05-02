"use client";

import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { getTimeAgo } from "@/lib/date";
import ProfileFollowCustomButton from "@/modules/profile/ui/profile-follow-custom-button";
import { Notification, User } from "@/types";
import Link from "next/link";

interface FollowingNotificationProps {
  loggedInUser: User;
  notification: Notification;
  sender: User;
  currentFollowStatus: string;
}

export default function FollowingNotification({
  loggedInUser,
  notification,
  sender,
  currentFollowStatus,
}: FollowingNotificationProps) {
  return (
    <Card className='w-full md:w-[45rem] py-2 rounded-xl'>
      <CardContent className='flex gap-3 md:gap-5 items-center justify-between px-3 md:px-6'>
        <div className='flex items-center gap-3 md:gap-5'>
          <UserAvatar imageUrl={sender.image || ""} name={sender.name} />
          <div className='flex flex-col gap-1'>
            <p>
              <Link
                href={`/users/${sender.username}`}
                className='font-bold hover:underline underline-offset-3'
              >
                @{sender.username}
              </Link>{" "}
              has started following you.
            </p>
            <p className='text-xs text-muted-foreground'>
              {getTimeAgo(notification.createdAt)}
            </p>
          </div>
        </div>

        <ProfileFollowCustomButton
          followStatus={currentFollowStatus}
          targetUser={sender}
          loggedInUser={loggedInUser}
          className='w-fit'
        />
      </CardContent>
    </Card>
  );
}
