"use client";

import { actionRegister } from "@/actions/auth";
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
import { authClient } from "@/lib/auth-client";
import { UserRegisterSchema, userRegisterSchema } from "@/lib/validators/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<UserRegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: UserRegisterSchema) {
    startTransition(() => {
      actionRegister(values).then((data) => {
        if ("success" in data) {
          toast.success(data.success);
          authClient.sendVerificationEmail({
            email: values.email,
            callbackURL: "/home",
          });
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
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Choose username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input
                    type='password'
                    placeholder='Enter password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isPending} className='w-full'>
            {isPending ? (
              <Loader2Icon className='animate-spin' />
            ) : (
              "Create an account"
            )}
          </Button>
          <div className='text-sm text-muted-foreground text-center'>
            Already have an account?{" "}
            <Link href='/sign-in' className='hover:text-white transition'>
              Sign-in
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
