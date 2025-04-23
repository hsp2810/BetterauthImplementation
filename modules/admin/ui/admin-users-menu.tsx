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
  RotateCcw,
  UserMinus,
  UserPen,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AdminUsersEditForm from "./admin-user-edit-form";
import { useState } from "react";

interface AdminUsersMenuProps {
  user: UserWithAccountsAndSessions;
}

export default function AdminUsersMenu({ user }: AdminUsersMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleRevertBan = async () => {
    await authClient.admin.unbanUser({
      userId: user.id,
    });
    router.refresh();

    toast.success("Ban was revert successfully");
  };

  const handleBan = async () => {
    await authClient.admin.banUser({
      userId: user.id,
      banReason: "Banned by Admin",
      banExpiresIn: 60 * 60 * 24 * 7,
    });
    router.refresh();

    toast.success("User is banned for 7 days");
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

          {user.banned ? (
            <DropdownMenuItem onClick={handleRevertBan}>
              <RotateCcw /> Revert ban
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleBan}>
              <UserX /> Ban
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <UserMinus />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <AdminUsersEditForm name={user.name} id={user.id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
