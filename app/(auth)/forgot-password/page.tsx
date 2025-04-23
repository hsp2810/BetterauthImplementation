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
  forgotPasswordEmailSchema,
  ForgotPasswordEmailSchema,
} from "@/lib/validators/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordEmailSchema>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordEmailSchema) {
    startTransition(() => {
      handleSubmit(values);
    });
  }

  async function handleSubmit(values: ForgotPasswordEmailSchema) {
    const { data, error } = await authClient.forgetPassword({
      email: values.email,
      redirectTo: "/reset-password",
    });

    if (data) {
      toast.success("Email has been sent to change the password");
      router.push("/sign-in");
    } else {
      toast.error(error.message);
    }
  }

  return (
    <div className='space-y-5'>
      <h1 className='font-bold text-2xl'>Forgot password</h1>
      <p className='text-sm text-muted-foreground'>
        Enter your account email on which we will send you the forgot password
        link
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 min-w-md'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='enter email' {...field} />
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
