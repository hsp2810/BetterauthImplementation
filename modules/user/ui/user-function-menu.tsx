"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { UserWithAccountsAndSessions } from "@/types";
import {
  EllipsisVertical,
  Loader2Icon,
  RotateCcw,
  Settings2,
  UserMinus,
  UserPen,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import UserEditForm from "./user-edit-form";
import { actionAdminDemote, actionUserDelete } from "@/actions/user";

interface AdminUsersMenuProps {
  user: UserWithAccountsAndSessions;
}

export default function UserFunctionMenu({ user }: AdminUsersMenuProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(() => {
      actionUserDelete(user.id).then((data) => {
        if ("success" in data) {
          toast.success("User deleted");
          router.push("/sign-up");
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  const handleDemote = () => {
    startTransition(() => {
      actionAdminDemote(user.id).then((data) => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger className='cursor-pointer'>
          <EllipsisVertical className='size-4' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='space-y-1'>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <UserPen />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
            {isPending ? (
              <Loader2Icon className='animate-spin' />
            ) : (
              <>
                <UserMinus />
                Delete
              </>
            )}
          </DropdownMenuItem>

          {user.role === "admin" && (
            <DropdownMenuItem onClick={handleDemote} disabled={isPending}>
              {isPending ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                <>
                  <Settings2 />
                  Demote
                </>
              )}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <UserEditForm name={user.name} id={user.id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
