"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Notification, User, UserFollow, UserWithFollow } from "@/types";
import { useState } from "react";
import ProfileHeaderStatsDialogList from "./profile-header-stats-dialog-list";

interface ProfileHeaderProps {
  followStatus: string;
  targetUser: User;
  loggedInUser: User;
  followers: UserWithFollow[];
  following: UserWithFollow[];
  followersList: UserFollow[];
  followingList: UserFollow[];
  notifications: Notification[];
}

export default function ProfileHeaderStats({
  followStatus,
  targetUser,
  loggedInUser,
  followers,
  following,
  followersList,
  followingList,
  notifications,
}: ProfileHeaderProps) {
  const [openModal, setOpenModal] = useState<"followers" | "following" | null>(
    null
  );

  const stats = [
    {
      label: "Posts",
      value: "1,234",
      onClick: null,
    },
    {
      label: "Followers",
      value: followers.length,
      onClick: () => setOpenModal("followers"),
    },
    {
      label: "Following",
      value: following.length,
      onClick: () => setOpenModal("following"),
    },
  ];

  const isLoggedIn = targetUser.id === loggedInUser.id;
  const isFollowing = followStatus === "Following";

  const canAccessLinks =
    isFollowing || isLoggedIn || targetUser.user_type === "public";

  return (
    <div className='flex gap-8 mb-3'>
      {stats.map(({ label, value, onClick }, index) => {
        const content = (
          <div className='flex flex-col items-center'>
            <div className='font-semibold'>{value}</div>
            <div className='text-sm text-muted-foreground'>{label}</div>
          </div>
        );

        return canAccessLinks && onClick ? (
          <button
            key={index}
            onClick={onClick}
            className='text-center md:text-left cursor-pointer bg-transparent border-none focus:outline-none'
          >
            {content}
          </button>
        ) : (
          <div key={index} className='text-center md:text-left'>
            {content}
          </div>
        );
      })}

      {/* Dialog */}
      <Dialog open={openModal !== null} onOpenChange={() => setOpenModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {openModal === "followers" ? "Followers" : "Following"}
            </DialogTitle>
            <div className='mt-4'>
              {!isLoggedIn && (
                <p className='text-sm mb-4'>
                  Only the account holder can see the full list
                </p>
              )}

              {openModal === "followers" ? (
                <ProfileHeaderStatsDialogList
                  loggedInUser={loggedInUser}
                  displayUsers={followers}
                  followersList={followersList}
                  dialogType='followers'
                  notifications={notifications}
                />
              ) : (
                <ProfileHeaderStatsDialogList
                  loggedInUser={loggedInUser}
                  displayUsers={following}
                  followingList={followingList}
                  dialogType='following'
                  notifications={notifications}
                />
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
