"use client";

import { actionDeleteAllNotifications } from "@/actions/notifications";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types";
import { Loader2Icon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface NotificationDeleteAllButtonProps {
  loggedInUserId: string;
}

export default function NotificationDeleteAllButton({
  loggedInUserId,
}: NotificationDeleteAllButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(() => {
      actionDeleteAllNotifications(loggedInUserId).then((data) => {
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
    <Button
      size={"sm"}
      variant={"destructive"}
      className='my-0'
      onClick={handleDelete}
    >
      {isPending ? (
        <Loader2Icon className='animate-spin' />
      ) : (
        <span className='flex gap-1 items-center'>
          <Trash /> Delete all
        </span>
      )}
    </Button>
  );
}
