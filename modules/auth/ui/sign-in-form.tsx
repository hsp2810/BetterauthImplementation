"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { actionLogin } from "@/actions/auth";
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
import { userLoginSchema, UserLoginSchema } from "@/lib/validators/zod";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<UserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: UserLoginSchema) {
    startTransition(() => {
      actionLogin(values).then((data) => {
        if ("success" in data) {
          window.location.href = "/home";
        } else if ("error" in data) {
          toast.error(data.error);
        }
      });
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder='Enter password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/forgot-password"}
            className='text-sm block text-muted-foreground underline underline-offset-3'
          >
            Forgot password?
          </Link>
          <Button className='w-full'>Sign-in</Button>
          <div className='text-sm text-muted-foreground text-center'>
            Don't have an account?{" "}
            <Link href='/sign-up' className='hover:text-white transition'>
              Sign-up
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
