"use client";

import { actionAdminRequestResponse } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTimeAgo } from "@/lib/date";
import { RequestsWithUser } from "@/types";
import { Check, Loader2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AdminRequestTable({
  requests,
}: {
  requests: RequestsWithUser[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRequest = (request: RequestsWithUser, response: boolean) => {
    startTransition(() => {
      actionAdminRequestResponse(request, response).then((data) => {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Created</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>{request.user.name}</TableCell>
            <TableCell>{request.user.email}</TableCell>
            <TableCell>{request.user.role?.toUpperCase()}</TableCell>
            <TableCell>{request.userMessage}</TableCell>
            <TableCell>{getTimeAgo(request.createdAt!)}</TableCell>
            <TableCell>
              <Button
                size={"icon"}
                variant={"secondary"}
                onClick={() => handleRequest(request, true)}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  <Check className='text-emerald-600' />
                )}
              </Button>
            </TableCell>
            <TableCell>
              <Button
                size={"icon"}
                variant={"secondary"}
                onClick={() => handleRequest(request, false)}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  <X className='text-destructive' />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
