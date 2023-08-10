"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

interface Props {
  text: string;
  authorId: string;
  communityId: string | null;
}

export const createThread = async ({ text, authorId, communityId }: Props) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (communityId) {
    } else {
      await prismadb.thread.create({
        data: {
          text,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
    }
  } catch (err: any) {
    throw new Error(`Failed to create thread: ${err.message}`);
  }
};
