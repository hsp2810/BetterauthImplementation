"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    content:
      "Snapiq has transformed how I share my photography. The community is incredibly supportive and the editing tools are professional-grade.",
    author: "Alex Johnson",
    role: "Professional Photographer",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    content:
      "I've tried many social platforms, but Snapiq stands out with its intuitive design and focus on authentic connections. It's my go-to app every day.",
    author: "Samantha Chen",
    role: "Content Creator",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    content:
      "The engagement on Snapiq is incredible. I've built a genuine following here that I couldn't find on other platforms.",
    author: "Marcus Williams",
    role: "Lifestyle Blogger",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function CommunitySection() {
  return (
    <section
      id='community'
      className='py-20 bg-gradient-to-br from-purple-900/10 via-background to-indigo-900/10'
    >
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent'>
              Join Our Thriving Community
            </span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Connect with millions of creators sharing their stories and building
            meaningful connections.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-card/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg relative group hover:bg-card/70 transition-colors'
            >
              {/* Subtle purple gradient accent */}
              <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='relative'>
                <div className='text-lg mb-6 text-foreground/80'>
                  "{testimonial.content}"
                </div>

                <div className='flex items-center gap-4'>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className='w-12 h-12 rounded-full object-cover border-2 border-purple-500/50'
                  />
                  <div>
                    <div className='font-semibold'>{testimonial.author}</div>
                    <div className='text-sm text-muted-foreground'>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='mt-16 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-2xl p-8 md:p-12 text-center border border-purple-500/10 backdrop-blur-sm'
        >
          <h3 className='text-xl md:text-2xl font-bold mb-4'>
            Join Over 10 Million Creators Today
          </h3>
          <p className='text-muted-foreground max-w-2xl mx-auto mb-8'>
            Express yourself, connect with friends, and discover amazing content
            from creators worldwide.
          </p>

          <div className='flex flex-wrap justify-center gap-4'>
            <div className='bg-card/60 backdrop-blur-sm border border-border rounded-lg px-6 py-4'>
              <div className='text-3xl font-bold text-purple-400'>10M+</div>
              <div className='text-sm text-muted-foreground'>Active Users</div>
            </div>
            <div className='bg-card/60 backdrop-blur-sm border border-border rounded-lg px-6 py-4'>
              <div className='text-3xl font-bold text-purple-400'>150M+</div>
              <div className='text-sm text-muted-foreground'>Photos Shared</div>
            </div>
            <div className='bg-card/60 backdrop-blur-sm border border-border rounded-lg px-6 py-4'>
              <div className='text-3xl font-bold text-purple-400'>50+</div>
              <div className='text-sm text-muted-foreground'>Countries</div>
            </div>
            <div className='bg-card/60 backdrop-blur-sm border border-border rounded-lg px-6 py-4'>
              <div className='text-3xl font-bold text-purple-400'>4.9/5</div>
              <div className='text-sm text-muted-foreground'>App Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
