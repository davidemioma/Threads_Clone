"use server";

import prismadb from "@/lib/prismadb";

interface Props {
  id: string;
}

export const deleteThread = async ({ id }: Props) => {
  try {
    const thread = await prismadb.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw new Error("Thread not found");
    }

    //Fetch all threads where the parent Id = current thread Id
    const childThreads = await prismadb.thread.findMany({
      where: {
        parentId: id,
      },
      select: {
        id: true,
      },
    });

    //Combine the current and child thread Id
    const threadsId = [id, ...childThreads.map((thread) => thread.id)];

    //Delete them all
    await prismadb.thread.deleteMany({
      where: {
        id: {
          in: threadsId,
        },
      },
    });
  } catch (err: any) {
    throw new Error(`Failed to delete thread: ${err.message}`);
  }
};
