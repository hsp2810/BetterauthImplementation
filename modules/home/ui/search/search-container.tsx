"use client";

import React, { useState, useEffect } from "react";
import { SearchInput } from "./search-input";
import SearchResults from "./search-results";
import { User } from "@/types";

export function SearchContainer({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(users);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.username &&
          user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <>
      <div className='mb-8'>
        <SearchInput searchTerm={searchTerm} onSearch={setSearchTerm} />
      </div>
      <SearchResults searchTerm={searchTerm} searchResults={searchResults} />
    </>
  );
}
