"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Users,
  MessageCircle,
  TrendingUp,
  Image,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: <Camera className='h-6 w-6 text-purple-400' />,
    title: "Share Photos & Stories",
    description:
      "Capture and share your favorite moments with filters and effects that make your content stand out.",
  },
  {
    icon: <Users className='h-6 w-6 text-purple-400' />,
    title: "Connect with Friends",
    description:
      "Follow friends and influencers to keep up with their latest updates and activities.",
  },
  {
    icon: <MessageCircle className='h-6 w-6 text-purple-400' />,
    title: "Direct Messages",
    description:
      "Chat privately with friends, share posts, and build meaningful connections.",
  },
  {
    icon: <TrendingUp className='h-6 w-6 text-purple-400' />,
    title: "Explore Trends",
    description:
      "Discover trending content and hashtags to stay updated with what's popular.",
  },
  {
    icon: <Image className='h-6 w-6 text-purple-400' />,
    title: "Advanced Editing",
    description:
      "Professional-grade editing tools to perfect your photos before sharing with your audience.",
  },
  {
    icon: <Lock className='h-6 w-6 text-purple-400' />,
    title: "Privacy Controls",
    description:
      "Manage who sees your content with customizable privacy settings for each post.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturesSection() {
  return (
    <section id='features' className='py-20 bg-background relative'>
      {/* Purple accent */}
      <div className='absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600'></div>

      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent'>
              Express Yourself Like Never Before
            </span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Discover all the ways Snapiq helps you create, connect, and share
            with the people that matter most.
          </p>
        </div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/80 transition-colors duration-300'
            >
              <div className='bg-purple-500/10 rounded-lg p-3 inline-block mb-4'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
              <p className='text-muted-foreground'>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
