"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { actionProfileUpdate } from "@/actions/user";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { userEditSchema, UserEditSchema } from "@/lib/validators/zod";
import { User } from "@/types";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ProfileEditFormProps {
  targetUser: User;
  setOpen: any;
}

export default function ProfileEditForm({
  targetUser,
  setOpen,
}: ProfileEditFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: targetUser.name,
      user_bio: targetUser.user_bio ? targetUser.user_bio : "",
      user_type: targetUser.user_type ? targetUser.user_type : "public",
    },
  });

  function onSubmit(values: UserEditSchema) {
    startTransition(() => {
      actionProfileUpdate(values, targetUser.id).then((data) => {
        if ("success" in data) {
          toast.success(data.success);
          setOpen(false);
          router.refresh();
        } else {
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5 space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='user_bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter bio'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='user_type'
          render={({ field }) => (
            <FormItem className='flex gap-3'>
              <FormLabel>Profile type: </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a verified email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='public'>Public</SelectItem>
                  <SelectItem value='private'>Private</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          {isPending ? <Loader2Icon className='animate-spin' /> : "Update"}
        </Button>
      </form>
    </Form>
  );
}
