"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";

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
import { useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

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

  const handleGoogleAuth = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/home",
      errorCallbackURL: "/sign-up",
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 min-w-xs md:min-w-md'
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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='enter password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/forgot-password"}
            className='block text-muted-foreground underline underline-offset-3'
          >
            Forgot password?
          </Link>
          <Button type='submit' disabled={isPending}>
            {isPending ? <Loader2Icon className='animate-spin' /> : "Sign-in"}
          </Button>
        </form>

        <div className='text-muted-foreground text-sm'>
          Want to create an account
          <Link href={"/sign-up"} className='underline underline-offset-2 ml-1'>
            Sign-up
          </Link>
        </div>
      </Form>
      <div className='flex flex-col items-center gap-5'>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>

        <Button
          variant='outline'
          type='button'
          disabled={isPending}
          onClick={handleGoogleAuth}
        >
          {isPending && <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />}
          Google
        </Button>
      </div>
    </>
  );
}
