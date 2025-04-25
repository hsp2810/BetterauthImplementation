"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";

import { actionUserEdit } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userEditSchema, UserEditSchema } from "@/lib/validators/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AdminUsersEditFormProps {
  id: string;
  name: string;
  setOpen: any;
}

export default function AdminUsersEditForm({
  id,
  name,
  setOpen,
}: AdminUsersEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name,
    },
  });

  function onSubmit(values: UserEditSchema) {
    startTransition(() => {
      actionUserEdit(values, id).then((data) => {
        if ("success" in data) {
          toast.success(data.success);
          setOpen(false);
          router.refresh();
        } else if ("error" in data) {
          toast.error(data.error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 md:min-w-md mt-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='change name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending} size={"sm"}>
          {isPending ? <Loader2Icon className='animate-spin' /> : "Update"}
        </Button>
      </form>
    </Form>
  );
}
