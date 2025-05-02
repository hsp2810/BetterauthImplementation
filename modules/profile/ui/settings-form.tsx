"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  forgotPasswordPasswordSchema,
  ForgotPasswordPasswordSchema,
} from "@/lib/validators/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { actionUpdatePassword } from "@/actions/user";
import { toast } from "sonner";

export default function SettingsForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ForgotPasswordPasswordSchema>({
    resolver: zodResolver(forgotPasswordPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: ForgotPasswordPasswordSchema) {
    startTransition(() => {
      actionUpdatePassword(values).then((data) => {
        if ("success" in data) {
          toast.success(data.success);
          router.refresh();
        } else {
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Set password' {...field} />
              </FormControl>
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
