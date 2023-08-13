"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

const Pagination = ({ pageNumber, isNext, path }: Props) => {
  const router = useRouter();

  const handlePagination = (type: "prev" | "next") => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      if (pageNumber === 1) return;

      nextPageNumber = Math.max(1, pageNumber - 1);
    } else {
      if (!isNext) return;

      nextPageNumber = pageNumber + 1;
    }

    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  if (!isNext && pageNumber === 1) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center gap-5 mt-10">
      <Button
        className="text-light-2"
        onClick={() => handlePagination("prev")}
        disabled={pageNumber === 1}
      >
        Prev
      </Button>

      <p className="font-semibold text-light-1">{pageNumber}</p>

      <Button
        className="text-light-2"
        onClick={() => handlePagination("next")}
        disabled={!isNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
