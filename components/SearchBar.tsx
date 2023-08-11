"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

interface Props {
  routeType: string;
  placeholder: string;
}

const SearchBar = ({ routeType, placeholder }: Props) => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim()) {
        router.push(`/${routeType}?q=${search}`);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className="bg-dark-3 flex items-center gap-2 px-4 py-2 rounded-lg">
      <div className="relative w-6 h-6 overflow-hidden">
        <Image
          className="object-cover"
          src="/assets/search-gray.svg"
          alt="search"
          fill
        />
      </div>

      <Input
        className="bg-transparent sm:text-lg text-light-4 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
