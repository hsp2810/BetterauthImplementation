"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Grid, Heart } from "lucide-react";

interface ProfileTabsProps {
  isLoggedIn: boolean;
}

export function ProfileTabs({ isLoggedIn }: ProfileTabsProps) {
  return (
    <Tabs defaultValue='posts' className='mb-8'>
      {isLoggedIn ? (
        <TabsList className={`grid w-full grid-cols-3 max-w-[400px] mx-auto`}>
          <TabsTrigger value='posts' className='flex items-center gap-2'>
            <Grid className='h-4 w-4' />
            <span className='hidden sm:inline'>Posts</span>
          </TabsTrigger>
          <TabsTrigger value='saved' className='flex items-center gap-2'>
            <Bookmark className='h-4 w-4' />
            <span className='hidden sm:inline'>Saved</span>
          </TabsTrigger>
          <TabsTrigger value='liked' className='flex items-center gap-2'>
            <Heart className='h-4 w-4' />
            <span className='hidden sm:inline'>Liked</span>
          </TabsTrigger>
        </TabsList>
      ) : (
        <TabsList className={`grid w-full grid-cols-1 max-w-[400px] mx-auto`}>
          <TabsTrigger value='posts' className='flex items-center gap-2'>
            <Grid className='h-4 w-4' />
            <span className='hidden sm:inline'>Posts</span>
          </TabsTrigger>
        </TabsList>
      )}
    </Tabs>
  );
}
