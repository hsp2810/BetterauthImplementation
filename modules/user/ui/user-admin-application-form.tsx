"use client";

import { actionAdminRequest } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

export default function UserAdminApplicationForm({
  userId,
}: {
  userId: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleRequest = () => {
    if (!message || message === "") {
      toast.error("Please enter a message");
    }

    startTransition(() => {
      actionAdminRequest(userId, message).then((data) => {
        if ("success" in data) {
          toast.success(data.success);
          setMessage("");
          router.refresh();
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <div className='space-y-4'>
      <Textarea
        placeholder='Why you want to be an admin?'
        className='resize-none'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type='button' onClick={handleRequest} disabled={isPending}>
        {isPending ? <Loader2Icon className='animate-spin' /> : "Request"}
      </Button>
    </div>
  );
}
