"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { checkFollowStatusClient } from "@/lib/follow";
import { Notification, User, UserFollow, UserWithFollow } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileFollowCustomButton from "./profile-follow-custom-button";

interface ProfileHeaderStatsDialogCardProps {
  follow: UserWithFollow;
  loggedInUser: User;
  followersList?: UserFollow[];
  followingList?: UserFollow[];
  notifications: Notification[];
  dialogType: string;
}

export default function ProfileHeaderStatsDialogCard({
  followersList,
  followingList,
  loggedInUser,
  follow,
  notifications,
  dialogType,
}: ProfileHeaderStatsDialogCardProps) {
  const [currentFollowStatus, setCurrentFollowStatus] = useState<string>("");

  useEffect(() => {
    const status = checkFollowStatusClient(
      loggedInUser.id,
      dialogType === "followers"
        ? (followersList as UserFollow[])
        : (followingList as UserFollow[]),
      follow.user.id,
      notifications
    );

    setCurrentFollowStatus((prev) => {
      if (prev !== status) return status;
      return prev;
    });
  }, [
    loggedInUser.id,
    follow.user.id,
    dialogType,
    followersList,
    followingList,
    notifications,
  ]);

  return (
    <Card className='w-full md:w-[45rem] py-2 rounded-xl border-none bg-inherit'>
      <CardContent className='flex gap-3 md:gap-5 items-center justify-between px-0'>
        <div className='flex items-center gap-3 md:gap-5'>
          <UserAvatar
            imageUrl={follow.user.image || ""}
            name={follow.user.name}
          />
          <div className='flex flex-col'>
            <Link
              href={`/users/${follow.user.username}`}
              className='hover:underline underline-offset-3'
            >
              Harshit Patel
            </Link>
            <p className='text-sm text-muted-foreground'>
              @{follow.user.username}
            </p>
          </div>
        </div>

        {loggedInUser.id === follow.user.id ? (
          <Badge className='rounded-sm'>You</Badge>
        ) : (
          <ProfileFollowCustomButton
            followStatus={currentFollowStatus}
            targetUser={follow.user}
            loggedInUser={loggedInUser}
            className='w-fit'
          />
        )}
      </CardContent>
    </Card>
  );
}
