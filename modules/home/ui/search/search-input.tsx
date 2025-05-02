"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search, Search as SearchIcon } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export function SearchInput({ searchTerm, onSearch }: SearchInputProps) {
  return (
    <div className='relative'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5' />
      <Input
        type='text'
        placeholder='Search by name or username...'
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className='py-7 pl-10 border-purple-200/20 bg- rounded-lg'
      />
    </div>
  );
}
