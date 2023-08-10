"use server";

import prismadb from "@/lib/prismadb";

interface Props {
  pageNumber: number;
  pageSize: number;
}

export const getThreads = async ({ pageNumber = 1, pageSize = 20 }: Props) => {
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    const threads = await prismadb.thread.findMany({
      skip: skipAmount,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    const totalThreads = await prismadb.thread.count();

    const totalPages = Math.ceil(totalThreads / pageSize);

    const hasMorePages = pageNumber < totalPages;

    return { threads, hasMorePages };
  } catch (err) {
    return [];
  }
};
