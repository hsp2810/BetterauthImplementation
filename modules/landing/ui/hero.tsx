"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className='relative min-h-screen pt-32 md:pt-20 pb-16 overflow-hidden'>
      {/* Purple gradient orbs */}
      <div className='absolute -top-40 -left-40 w-80 h-80  rounded-full blur-3xl'></div>
      <div className='absolute top-1/2 -right-20 w-80 h-80  rounded-full blur-3xl'></div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-16'>
          <motion.div
            className='flex-1 text-center lg:text-left'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
              <span className=''>Share Moments. Connect Lives.</span>
            </h1>
            <p className='text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto lg:mx-0'>
              Join millions of creators sharing their stories, connecting with
              friends, and discovering experiences that matter to them.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <Link
                href='sign-up'
                className={cn(buttonVariants({ size: "lg" }), "group")}
              >
                Get Started
                <ChevronRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </Link>
              <Button variant='outline' size='lg' className='gap-2'>
                <PlayCircle className='h-5 w-5' />
                How it works
              </Button>
            </div>
            <div className='mt-8 text-muted-foreground text-sm flex items-center justify-center lg:justify-start gap-4'>
              <span>
                Join <span className='font-semibold '>10M+</span> users
                worldwide
              </span>
            </div>
          </motion.div>

          <motion.div
            className='flex-1 relative'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className='relative mx-auto w-full max-w-md'>
              {/* Phone mockup with shadow */}
              <div className='relative z-10 rounded-[2.5rem] ring-1 ring-purple-900/10 shadow-xl overflow-hidden'>
                <div className='aspect-[9/19] bg-black rounded-[2.3rem] overflow-hidden'>
                  <img
                    src='https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                    alt='Snapiq app interface'
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-10 h-10 rounded-full'></div>
                      <div>
                        <div className='text-white font-semibold'>
                          alexjohnson
                        </div>
                        <div className='text-white/80 text-xs'>
                          2 minutes ago
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-4 text-white/90 text-sm'>
                      <div className='flex items-center gap-1'>
                        <svg
                          className='w-4 h-4'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                            clipRule='evenodd'
                            fillRule='evenodd'
                          ></path>
                        </svg>
                        <span>12.5k</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <svg
                          className='w-4 h-4'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z'></path>
                          <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z'></path>
                        </svg>
                        <span>723</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <svg
                          className='w-4 h-4'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'></path>
                          <path
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            clipRule='evenodd'
                            fillRule='evenodd'
                          ></path>
                        </svg>
                        <span>40.2k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className='absolute -right-4 top-1/3 transform rotate-12 z-20'>
                <div className='bg-white/10 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-white/20'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-full bg-purple-400'></div>
                    <div className='h-2 w-16 bg-white/60 rounded'></div>
                  </div>
                  <div className='mt-2 h-2 w-24 bg-white/40 rounded'></div>
                </div>
              </div>

              <div className='absolute -left-10 top-1/2 transform -rotate-6 z-20'>
                <div className='bg-white/10 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-white/20'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-full bg-indigo-400'></div>
                    <div className='h-2 w-12 bg-white/60 rounded'></div>
                  </div>
                  <div className='mt-2 h-2 w-20 bg-white/40 rounded'></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
