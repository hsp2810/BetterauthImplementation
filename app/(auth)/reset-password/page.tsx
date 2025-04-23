"use client";

import { authClient } from "@/lib/auth-client";
import React, { useTransition } from "react";
import { toast } from "sonner";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordPasswordSchema,
  forgotPasswordPasswordSchema,
} from "@/lib/validators/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordPasswordSchema>({
    resolver: zodResolver(forgotPasswordPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: ForgotPasswordPasswordSchema) {
    startTransition(() => {
      handleReset(values);
    });
  }

  async function handleReset(values: ForgotPasswordPasswordSchema) {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      router.push("/sign-in");
      toast.error("Not able to find the reset token! Please try again later!");
      return;
    }

    const { data, error } = await authClient.resetPassword({
      newPassword: values.password,
      token: token as string,
    });

    if (data) {
      toast.success("Password changed successfully");
      router.push("/sign-in");
    } else {
      toast.error(error.message);
    }
  }

  return (
    <div className='space-y-5'>
      <h1 className='font-bold text-2xl'>Reset password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 min-w-md'
        >
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder='enter new password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isPending}>
            {isPending ? <Loader2Icon className='animate-spin' /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
