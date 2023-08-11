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
      where: {
        isChild: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        community: true,
      },
    });

    return threads;
  } catch (err) {
    return [];
  }
};

export const hasMorePages = async ({
  pageNumber = 1,
  pageSize = 20,
}: Props) => {
  const totalThreads = await prismadb.thread.count();

  const totalPages = Math.ceil(totalThreads / pageSize);

  const hasMorePages = pageNumber < totalPages;

  return hasMorePages;
};

export const getUserThreadCount = async (userId: string) => {
  try {
    const totalThreads = await prismadb.thread.count({
      where: {
        authorId: userId,
        isChild: false,
      },
    });

    return totalThreads;
  } catch (err) {
    return 0;
  }
};
