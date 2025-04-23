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
import { Loader2Icon, User } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<UserRegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const handleGoogleAuth = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/home",
      errorCallbackURL: "/sign-up",
    });
  };

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 min-w-md'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='enter name' {...field} />
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
          <Button type='submit' disabled={isPending}>
            {isPending ? <Loader2Icon className='animate-spin' /> : "Sign-up"}
          </Button>
        </form>

        <div className='text-muted-foreground text-sm'>
          Already have an account
          <Link href={"/sign-in"} className='underline underline-offset-2 ml-1'>
            Sign-in
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
