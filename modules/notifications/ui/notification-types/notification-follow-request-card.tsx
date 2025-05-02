"use client";

import {
  actionAcceptFollowRequest,
  actionDeleteNotification,
} from "@/actions/notifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { getTimeAgo } from "@/lib/date";
import { Notification, User } from "@/types";
import { Loader2Icon, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface FollowRequestProps {
  notification: Notification;
  sender: User;
}

export default function FollowRequestNotification({
  notification,
  sender,
}: FollowRequestProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAcceptNotification = () => {
    startTransition(() => {
      actionAcceptFollowRequest(sender, notification.id).then((data) => {
        if ("success" in data) {
          toast.success(data.success);
          router.refresh();
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  const handleDeleteNotification = () => {
    startTransition(() => {
      actionDeleteNotification(notification.id).then((data) => {
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
    <Card className='w-full md:w-[45rem] py-2 rounded-xl'>
      <CardContent className='flex gap-3 md:gap-5 items-center justify-between px-3 md:px-6'>
        <div className='flex items-center gap-3 md:gap-5'>
          <UserAvatar imageUrl={sender.image || ""} name={sender.name} />
          <div className='flex flex-col'>
            <p>
              <Link
                href={`/users/${sender.username}`}
                className='font-bold hover:underline underline-offset-3'
              >
                @{sender.username}
              </Link>{" "}
              would like to follow you.
            </p>
            <p className='text-xs text-muted-foreground'>
              {getTimeAgo(notification.createdAt)}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            size={"sm"}
            onClick={handleAcceptNotification}
            disabled={isPending}
          >
            {isPending ? <Loader2Icon className='animate-spin' /> : "Accept"}
          </Button>
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={handleDeleteNotification}
            disabled={isPending}
          >
            {isPending ? <Loader2Icon className='animate-spin' /> : <Trash />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
