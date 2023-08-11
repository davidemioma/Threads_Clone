"use server";

import prismadb from "@/lib/prismadb";

export const getChildrenThread = async (id: string) => {
  try {
    if (!id) return [];

    const threads = await prismadb.thread.findMany({
      where: {
        parentId: id,
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
