"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";

import { actionUserUsername } from "@/actions/user";
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
import { userUsernameSchema, UserUsernameSchema } from "@/lib/validators/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UsernameFormProps {
  id: string;
}

export default function UsernameUpdateForm({ id }: UsernameFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<UserUsernameSchema>({
    resolver: zodResolver(userUsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: UserUsernameSchema) {
    startTransition(() => {
      actionUserUsername(values, id).then((data) => {
        if ("success" in data) {
          toast.success(data.success);
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
        className='space-y-8 max-w-sm mt-4'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Set username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending} size={"sm"}>
          {isPending ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            "Update username"
          )}
        </Button>
      </form>
    </Form>
  );
}
