"use server";

import prismadb from "@/lib/prismadb";

export const getThreadsByCommunityId = async (id: string) => {
  try {
    if (!id) return [];

    const threads = await prismadb.thread.findMany({
      where: {
        community: {
          id,
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

    return threads;
  } catch (err) {
    return [];
  }
};
