"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import ProfileEditDialog from "./profile-edit-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "@/types";

export default function ProfileEditMenu({ targetUser }: { targetUser: User }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
        >
          <MoreHorizontal className='size-5' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileEditDialog targetUser={targetUser} setOpen={setOpen} />
    </Dialog>
  );
}
