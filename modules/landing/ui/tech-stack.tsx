import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TechStack() {
  return (
    <section id='tech-stack' className='py-16 md:py-24 bg-muted/50'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <Badge className='px-3 py-1 text-sm' variant='secondary'>
              Technology Stack
            </Badge>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Built With Modern Technologies
            </h2>
            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              BetterAuth leverages the best tools and libraries to provide a
              robust authentication solution.
            </p>
          </div>
        </div>

        <div className='mx-auto max-w-4xl py-12'>
          <Tabs defaultValue='drizzle' className='w-full'>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='drizzle'>Drizzle</TabsTrigger>
              <TabsTrigger value='neon'>Neon</TabsTrigger>
              <TabsTrigger value='zod'>Zod</TabsTrigger>
              <TabsTrigger value='trpc'>tRPC</TabsTrigger>
            </TabsList>
            <TabsContent value='drizzle' className='mt-6'>
              <Card>
                <CardContent className='p-6'>
                  <div className='grid gap-6 md:grid-cols-2 md:gap-12'>
                    <div className='flex flex-col justify-center space-y-4'>
                      <div className='space-y-2'>
                        <h3 className='text-2xl font-bold'>Drizzle ORM</h3>
                        <p className='text-muted-foreground'>
                          A lightweight, type-safe ORM for TypeScript that
                          provides a seamless database experience.
                        </p>
                      </div>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Type-safe schema definitions
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Efficient query building
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Migrations management
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Optimized for Postgres
                        </li>
                      </ul>
                    </div>
                    <div className='flex items-center justify-center'>
                      <div className='relative w-full h-[200px] md:h-[250px] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl overflow-hidden'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <pre className='text-xs md:text-sm p-4 bg-card border rounded-lg shadow-sm overflow-hidden'>
                            <code className='text-primary'>
                              {`import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='neon' className='mt-6'>
              <Card>
                <CardContent className='p-6'>
                  <div className='grid gap-6 md:grid-cols-2 md:gap-12'>
                    <div className='flex flex-col justify-center space-y-4'>
                      <div className='space-y-2'>
                        <h3 className='text-2xl font-bold'>Neon Database</h3>
                        <p className='text-muted-foreground'>
                          Serverless Postgres database with autoscaling and
                          branching capabilities.
                        </p>
                      </div>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Serverless architecture
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Auto-scaling storage
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Branch for development
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Global availability
                        </li>
                      </ul>
                    </div>
                    <div className='flex items-center justify-center'>
                      <div className='relative w-full h-[200px] md:h-[250px] bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-xl overflow-hidden'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='w-4/5 bg-card border rounded-lg shadow-sm overflow-hidden p-4'>
                            <div className='h-4 w-32 bg-muted/80 mb-4 rounded'></div>
                            <div className='space-y-2'>
                              <div className='h-3 w-full bg-muted/50 rounded'></div>
                              <div className='h-3 w-5/6 bg-muted/50 rounded'></div>
                              <div className='h-3 w-4/5 bg-muted/50 rounded'></div>
                            </div>
                            <div className='mt-4 grid grid-cols-3 gap-2'>
                              <div className='h-12 bg-primary/10 rounded-md'></div>
                              <div className='h-12 bg-primary/10 rounded-md'></div>
                              <div className='h-12 bg-primary/10 rounded-md'></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='zod' className='mt-6'>
              <Card>
                <CardContent className='p-6'>
                  <div className='grid gap-6 md:grid-cols-2 md:gap-12'>
                    <div className='flex flex-col justify-center space-y-4'>
                      <div className='space-y-2'>
                        <h3 className='text-2xl font-bold'>Zod Validation</h3>
                        <p className='text-muted-foreground'>
                          TypeScript-first schema validation with static type
                          inference.
                        </p>
                      </div>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Runtime type validation
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Static type inference
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Composable schemas
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Error handling
                        </li>
                      </ul>
                    </div>
                    <div className='flex items-center justify-center'>
                      <div className='relative w-full h-[200px] md:h-[250px] bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl overflow-hidden'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <pre className='text-xs md:text-sm p-4 bg-card border rounded-lg shadow-sm overflow-hidden'>
                            <code className='text-primary'>
                              {`import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
});

type User = z.infer<typeof UserSchema>;

// Type-safe validation
const validateUser = (data: unknown): User => {
  return UserSchema.parse(data);
};`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='trpc' className='mt-6'>
              <Card>
                <CardContent className='p-6'>
                  <div className='grid gap-6 md:grid-cols-2 md:gap-12'>
                    <div className='flex flex-col justify-center space-y-4'>
                      <div className='space-y-2'>
                        <h3 className='text-2xl font-bold'>tRPC</h3>
                        <p className='text-muted-foreground'>
                          End-to-end typesafe APIs with TypeScript for seamless
                          client-server integration.
                        </p>
                      </div>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          End-to-end type safety
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Automatic API documentation
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Efficient data fetching
                        </li>
                        <li className='flex items-center'>
                          <span className='mr-2 text-primary'>✓</span>
                          Middleware support
                        </li>
                      </ul>
                    </div>
                    <div className='flex items-center justify-center'>
                      <div className='relative w-full h-[200px] md:h-[250px] bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-xl overflow-hidden'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <pre className='text-xs md:text-sm p-4 bg-card border rounded-lg shadow-sm overflow-hidden'>
                            <code className='text-primary'>
                              {`import { router, procedure } from '../trpc';
import { z } from 'zod';

export const authRouter = router({
  login: procedure
    .input(z.object({
      email: z.string().email(),
      password: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      // Authentication logic
      return { user: { id: 1, email: input.email } };
    })
});`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
