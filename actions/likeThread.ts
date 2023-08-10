"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { CurrentUser } from "@/types/prisma";

interface Props {
  currentUser: CurrentUser | null;
  threadId: string;
  hasLiked: boolean;
}

export const likeThread = async ({
  currentUser,
  threadId,
  hasLiked,
}: Props) => {
  try {
    const { userId } = await auth();

    if (!userId || !currentUser) {
      throw new Error("Unauthorized");
    }

    const threadExists = await prismadb.thread.findUnique({
      where: {
        id: threadId,
      },
    });

    if (!threadExists) {
      throw new Error("Thread does not exists");
    }

    if (hasLiked) {
      await prismadb.thread.update({
        where: {
          id: threadId,
        },
        data: {
          likedIds: [...threadExists.likedIds].filter(
            (id) => id !== currentUser.id
          ),
        },
      });
    } else {
      await prismadb.thread.update({
        where: {
          id: threadId,
        },
        data: {
          likedIds: [currentUser.id, ...threadExists.likedIds],
        },
      });
    }
  } catch (err: any) {
    throw new Error(`Failed to like thread: ${err.message}`);
  }
};
