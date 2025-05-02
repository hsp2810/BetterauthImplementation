"use client";

import { actionDeleteFollowRequest } from "@/actions/notifications";
import { actionFollowUser, actionUnFollowUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import ProfileUnfollowConfirmDialog from "./profile-unfollow-confirm-dialog";

interface ProfileFollowCustomButtonProps {
  followStatus: string;
  targetUser: User;
  loggedInUser: User;
  className?: string;
}

export default function ProfileFollowCustomButton({
  followStatus,
  targetUser,
  loggedInUser,
  className,
}: ProfileFollowCustomButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isLoggedIn = targetUser.id === loggedInUser.id;
  const isFollowing = followStatus === "Following";

  const handleButtonClick = () => {
    startTransition(() => {
      if (followStatus === "Requested") {
        actionDeleteFollowRequest(targetUser).then((data) => {
          if ("success" in data) {
            toast.success(data.success);
            router.refresh();
          } else {
            toast.error(data.error);
          }
        });
      } else {
        actionFollowUser(loggedInUser, targetUser).then((data) => {
          if ("success" in data) {
            toast.success(data.success);
            router.refresh();
          } else {
            toast.error(data.error);
          }
        });
      }
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      actionUnFollowUser(targetUser).then((data) => {
        if ("success" in data) {
          toast.success(data.success);
          router.refresh();
        } else {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <div className={className}>
      {!isLoggedIn && (
        <>
          {isFollowing ? (
            <>
              {targetUser.user_type === "private" ? (
                <ProfileUnfollowConfirmDialog
                  handleUnFollow={handleUnFollow}
                  isPending={isPending}
                />
              ) : (
                <Button
                  className={className}
                  onClick={handleUnFollow}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2Icon className='animate-spin' />
                  ) : (
                    <>{followStatus}</>
                  )}
                </Button>
              )}
            </>
          ) : (
            <Button
              className={className}
              onClick={handleButtonClick}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                <>{followStatus}</>
              )}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
