import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section id='testimonials' className='py-16 md:py-24'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <Badge className='px-3 py-1 text-sm' variant='secondary'>
              Testimonials
            </Badge>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              What Developers Say
            </h2>
            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Hear from developers who have implemented BetterAuth in their
              applications.
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-3'>
          <Card className='backdrop-blur-sm border-primary/20'>
            <CardHeader>
              <Quote className='h-8 w-8 text-primary opacity-50' />
            </CardHeader>
            <CardContent>
              <p className='text-md mb-4'>
                BetterAuth has simplified our authentication process
                significantly. The type-safety with Zod and tRPC saved us from
                countless potential bugs.
              </p>
            </CardContent>
            <CardFooter className='flex items-center space-x-4'>
              <div className='h-10 w-10 rounded-full bg-muted'></div>
              <div>
                <p className='text-sm font-medium'>Alex Johnson</p>
                <p className='text-xs text-muted-foreground'>
                  Frontend Lead at TechCorp
                </p>
              </div>
            </CardFooter>
          </Card>
          <Card className='backdrop-blur-sm border-primary/20'>
            <CardHeader>
              <Quote className='h-8 w-8 text-primary opacity-50' />
            </CardHeader>
            <CardContent>
              <p className='text-md mb-4'>
                The integration with Neon and Drizzle made database operations
                so much cleaner. Our authentication flows are now fully
                type-safe from database to UI.
              </p>
            </CardContent>
            <CardFooter className='flex items-center space-x-4'>
              <div className='h-10 w-10 rounded-full bg-muted'></div>
              <div>
                <p className='text-sm font-medium'>Maria Garcia</p>
                <p className='text-xs text-muted-foreground'>CTO at StartupX</p>
              </div>
            </CardFooter>
          </Card>
          <Card className='backdrop-blur-sm border-primary/20'>
            <CardHeader>
              <Quote className='h-8 w-8 text-primary opacity-50' />
            </CardHeader>
            <CardContent>
              <p className='text-md mb-4'>
                I was able to implement a complete authentication system in my
                Next.js app in less than a day. The documentation is excellent
                and the API is intuitive.
              </p>
            </CardContent>
            <CardFooter className='flex items-center space-x-4'>
              <div className='h-10 w-10 rounded-full bg-muted'></div>
              <div>
                <p className='text-sm font-medium'>David Kim</p>
                <p className='text-xs text-muted-foreground'>
                  Independent Developer
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
