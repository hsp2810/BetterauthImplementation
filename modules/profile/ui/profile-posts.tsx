"use client";

import React from "react";
import { Heart, MessageCircle } from "lucide-react";

const posts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
    likes: "12.5K",
    comments: "423",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg",
    likes: "9.1K",
    comments: "287",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
    likes: "15.8K",
    comments: "562",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg",
    likes: "11.2K",
    comments: "345",
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/3225521/pexels-photo-3225521.jpeg",
    likes: "13.7K",
    comments: "489",
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/3225520/pexels-photo-3225520.jpeg",
    likes: "10.4K",
    comments: "312",
  },
];

export function ProfilePosts() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {posts.map((post) => (
        <div key={post.id} className='relative group aspect-square'>
          <img
            src={post.image}
            alt={`Post ${post.id}`}
            className='w-full h-full object-cover rounded-lg'
          />
          <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center'>
            <div className='flex gap-6 text-white'>
              <div className='flex items-center gap-2'>
                <Heart className='h-6 w-6 fill-white' />
                <span className='font-semibold'>{post.likes}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MessageCircle className='h-6 w-6 fill-white' />
                <span className='font-semibold'>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
