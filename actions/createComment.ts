"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

interface Props {
  text: string;
  authorId: string;
  threadId: string;
  communityId: string | null;
}

export const createComment = async ({
  text,
  authorId,
  threadId,
  communityId,
}: Props) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!threadId) {
      throw new Error("Thread Id is required");
    }

    if (communityId) {
    } else {
      await prismadb.thread.create({
        data: {
          text,
          parentId: threadId,
          isChild: true,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
    }
  } catch (err: any) {
    throw new Error(`Failed to create comment: ${err.message}`);
  }
};
