"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import Link from "next/link";

interface SearchResultsProps {
  searchTerm: string;
  searchResults: User[];
}

export default function SearchResults({
  searchTerm,
  searchResults,
}: SearchResultsProps) {
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className='bg-yellow-200 dark:bg-yellow-900'>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (searchTerm && searchResults.length === 0) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        No users found matching "{searchTerm}"
      </div>
    );
  }

  if (!searchTerm) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        Start typing to search for users
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {searchResults.map((user) => (
        <Card
          key={user.id}
          className='p-4 bg-card/50 backdrop-blur-sm hover:bg-card transition-colors'
        >
          <div className='flex items-center gap-4'>
            <UserAvatar
              imageUrl={user.image || ""}
              name={user.name}
              className='w-12 h-12 rounded-full object-cover border-2'
            />
            <div>
              <div className='font-semibold'>
                {highlightText(user.name, searchTerm)}
              </div>

              {user.username && (
                <div className='text-sm text-muted-foreground'>
                  @{highlightText(user.username, searchTerm)}
                </div>
              )}
            </div>
            <Link
              href={`/users/${user.username}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "ml-auto"
              )}
            >
              View Profile
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
