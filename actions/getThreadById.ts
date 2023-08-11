"use server";

import prismadb from "@/lib/prismadb";

export const getThreadById = async (id: string) => {
  try {
    if (!id) return null;

    const thread = await prismadb.thread.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    return thread;
  } catch (err) {
    return null;
  }
};
