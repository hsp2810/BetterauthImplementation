import { Badge } from "@/components/ui/badge";
import {
  UserIcon,
  UsersIcon,
  KeyIcon,
  ShieldCheck,
  ActivityIcon,
  ServerIcon,
} from "lucide-react";

export function Services() {
  return (
    <section id='services' className='py-16 md:py-24'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <Badge className='px-3 py-1 text-sm' variant='secondary'>
              Our Services
            </Badge>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Complete Authentication Solution
            </h2>
            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              BetterAuth provides everything you need to implement secure,
              user-friendly authentication in your application.
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3'>
          <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm bg-card transition-all hover:shadow-md'>
            <div className='rounded-full bg-primary/10 p-3'>
              <UserIcon className='h-6 w-6 text-primary' />
            </div>
            <div className='space-y-2 text-center'>
              <h3 className='font-bold'>User Authentication</h3>
              <p className='text-sm text-muted-foreground'>
                Secure sign-in, sign-up, and password reset flows with email
                verification.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm bg-card transition-all hover:shadow-md'>
            <div className='rounded-full bg-primary/10 p-3'>
              <UsersIcon className='h-6 w-6 text-primary' />
            </div>
            <div className='space-y-2 text-center'>
              <h3 className='font-bold'>Role-Based Access</h3>
              <p className='text-sm text-muted-foreground'>
                Granular permissions and role management for your application
                users.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm bg-card transition-all hover:shadow-md'>
            <div className='rounded-full bg-primary/10 p-3'>
              <KeyIcon className='h-6 w-6 text-primary' />
            </div>
            <div className='space-y-2 text-center'>
              <h3 className='font-bold'>Multi-Factor Auth</h3>
              <p className='text-sm text-muted-foreground'>
                Add an extra layer of security with TOTP or SMS verification.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm bg-card transition-all hover:shadow-md'>
            <div className='rounded-full bg-primary/10 p-3'>
              <ShieldCheck className='h-6 w-6 text-primary' />
            </div>
            <div className='space-y-2 text-center'>
              <h3 className='font-bold'>Secure Sessions</h3>
              <p className='text-sm text-muted-foreground'>
                Session management with JWTs and automatic token rotation.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm bg-card transition-all hover:shadow-md'>
            <div className='rounded-full bg-primary/10 p-3'>
              <ActivityIcon className='h-6 w-6 text-primary' />
            </div>
            <div className='space-y-2 text-center'>
              <h3 className='font-bold'>Activity Logging</h3>
              <p className='text-sm text-muted-foreground'>
                Detailed audit logs for all authentication events and user
                actions.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm bg-card transition-all hover:shadow-md'>
            <div className='rounded-full bg-primary/10 p-3'>
              <ServerIcon className='h-6 w-6 text-primary' />
            </div>
            <div className='space-y-2 text-center'>
              <h3 className='font-bold'>API Authentication</h3>
              <p className='text-sm text-muted-foreground'>
                Secure your APIs with token-based authentication and rate
                limiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
