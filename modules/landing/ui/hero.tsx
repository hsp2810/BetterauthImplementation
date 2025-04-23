import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id='hero' className='relative pt-32 md:pt-44 pb-16 md:pb-32'>
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background'></div>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-4'>
              <h1 className='text-5xl font-bold tracking-tighter xl:text-6xl/none'>
                Better Authentication for Modern Applications
              </h1>
              <p className='max-w-[600px] text-muted-foreground'>
                Secure, flexible, and developer-friendly authentication using
                Drizzle, Neon, Zod, and tRPC.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link href='/sign-in'>
                <Button size='lg' className='group'>
                  Get Started
                  <ArrowRightIcon className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Button>
              </Link>
            </div>
            <div className='flex items-center gap-4 pt-4'>
              <div className='flex -space-x-2'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='inline-block h-8 w-8 rounded-full bg-gray-100 ring-2 ring-background dark:bg-gray-700'
                  ></div>
                ))}
              </div>
              <div className='text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>250+</span>{" "}
                developers trust BetterAuth
              </div>
            </div>
          </div>
          <div className='mx-auto flex items-center justify-center rounded-xl border bg-card p-8 shadow-lg'>
            <div className='w-full max-w-sm space-y-6'>
              <div className='space-y-2 text-center'>
                <ShieldCheckIcon className='mx-auto h-10 w-10 text-primary' />
                <h2 className='text-2xl font-bold'>BetterAuth Demo</h2>
                <p className='text-sm text-muted-foreground'>
                  Sign in to your account to explore the demo
                </p>
              </div>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='h-9 w-full rounded-md bg-muted/80 animate-pulse'></div>
                </div>
                <div className='space-y-2'>
                  <div className='h-9 w-full rounded-md bg-muted/80 animate-pulse'></div>
                </div>
                <div className='pt-2'>
                  <div className='h-10 w-full rounded-md bg-primary/80 animate-pulse'></div>
                </div>
              </div>
              <div className='text-center text-sm'>
                Don&apos;t have an account?{" "}
                <Link
                  href='/sign-up'
                  className='font-medium text-primary underline underline-offset-4'
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
