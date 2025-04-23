import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlertIcon,
  KeyIcon,
  CodesandboxIcon,
  ZapIcon,
} from "lucide-react";

export function About() {
  return (
    <section id='about' className='py-16 md:py-24 bg-muted/50'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <Badge className='px-3 py-1 text-sm' variant='secondary'>
              About BetterAuth
            </Badge>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Why Choose BetterAuth?
            </h2>
            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              BetterAuth provides a complete authentication solution for modern
              web applications with a focus on developer experience and
              security.
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12'>
          <Card className='backdrop-blur-sm border-primary/20'>
            <CardHeader className='space-y-1 flex md:flex-row items-start gap-4'>
              <ShieldAlertIcon className='h-8 w-8 text-primary' />
              <div>
                <CardTitle>Enterprise-Grade Security</CardTitle>
                <CardDescription>
                  Built with modern security practices to protect your users and
                  data.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className='list-disc pl-5 space-y-2 text-sm text-muted-foreground'>
                <li>OWASP-compliant authentication flows</li>
                <li>Multi-factor authentication support</li>
                <li>Session management with automatic rotation</li>
                <li>Rate limiting and brute force protection</li>
              </ul>
            </CardContent>
          </Card>
          <Card className='backdrop-blur-sm border-primary/20'>
            <CardHeader className='space-y-1 flex md:flex-row items-start gap-4'>
              <KeyIcon className='h-8 w-8 text-primary' />
              <div>
                <CardTitle>Developer First</CardTitle>
                <CardDescription>
                  Built by developers, for developers, with a focus on DX.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className='list-disc pl-5 space-y-2 text-sm text-muted-foreground'>
                <li>Type-safe APIs with Zod validation</li>
                <li>End-to-end typesafety with tRPC</li>
                <li>Well-documented APIs and components</li>
                <li>Flexible configuration options</li>
              </ul>
            </CardContent>
          </Card>
          <Card className='backdrop-blur-sm border-primary/20'>
            <CardHeader className='space-y-1 flex md:flex-row items-start gap-4'>
              <CodesandboxIcon className='h-8 w-8 text-primary' />
              <div>
                <CardTitle>Modern Stack</CardTitle>
                <CardDescription>
                  Built with the latest technologies for performance and
                  reliability.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className='list-disc pl-5 space-y-2 text-sm text-muted-foreground'>
                <li>Drizzle ORM for type-safe database access</li>
                <li>Neon serverless Postgres for scalability</li>
                <li>Edge-compatible architecture</li>
                <li>Optimized for Next.js applications</li>
              </ul>
            </CardContent>
          </Card>
          <Card className='backdrop-blur-sm border-primary/20'>
            <CardHeader className='space-y-1 flex md:flex-row items-start gap-4'>
              <ZapIcon className='h-8 w-8 text-primary' />
              <div>
                <CardTitle>Performance Focused</CardTitle>
                <CardDescription>
                  Designed for speed and reliability in production environments.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className='list-disc pl-5 space-y-2 text-sm text-muted-foreground'>
                <li>Minimal client-side JavaScript</li>
                <li>Optimized database queries</li>
                <li>Edge-first authentication flows</li>
                <li>Global distribution with Neon</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
