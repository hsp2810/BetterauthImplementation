"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MessageSquareIcon, UserIcon } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <section id='contact' className='py-16 md:py-24 bg-muted/50'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <Badge className='px-3 py-1 text-sm' variant='secondary'>
              Contact Us
            </Badge>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Get in Touch
            </h2>
            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Have questions about BetterAuth? We're here to help.
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 lg:grid-cols-2'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='rounded-full bg-primary/10 p-2'>
                <MailIcon className='h-4 w-4 text-primary' />
              </div>
              <p className='text-sm'>contact@betterauth.example</p>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='rounded-full bg-primary/10 p-2'>
                <MessageSquareIcon className='h-4 w-4 text-primary' />
              </div>
              <p className='text-sm'>Join our Discord community</p>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='rounded-full bg-primary/10 p-2'>
                <UserIcon className='h-4 w-4 text-primary' />
              </div>
              <p className='text-sm'>Book a demo call</p>
            </div>
            <div className='mt-6 rounded-lg border bg-card p-6'>
              <h3 className='mb-4 text-lg font-medium'>Quick Support</h3>
              <p className='mb-4 text-sm text-muted-foreground'>
                Our team is available Monday through Friday from 9am to 5pm EST.
                We typically respond to inquiries within 24 hours.
              </p>
              <div className='flex flex-col space-y-2'>
                <div className='h-2 w-full rounded-full bg-muted'>
                  <div className='h-2 w-11/12 rounded-full bg-primary'></div>
                </div>
                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>Average response time</span>
                  <span>2 hours</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 rounded-lg border bg-card p-6'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Your name' {...field} />
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
                        <Input
                          placeholder='your.email@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='How can we help you?'
                          {...field}
                          className='min-h-[120px]'
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide as much detail as possible about your
                        inquiry.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
