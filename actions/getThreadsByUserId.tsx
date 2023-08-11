"use server";

import prismadb from "@/lib/prismadb";

interface Props {
  id: string;
  replies?: boolean;
}

export const getThreadsByUserId = async ({ id, replies }: Props) => {
  try {
    if (!id) return [];

    let threads: any;

    if (replies) {
      threads = await prismadb.thread.findMany({
        where: {
          authorId: id,
          NOT: {
            parentId: null,
          },
        },
        include: {
          author: true,
          community: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      threads = await prismadb.thread.findMany({
        where: {
          authorId: id,
          isChild: false,
        },
        include: {
          author: true,
          community: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return threads;
  } catch (err) {
    return [];
  }
};
