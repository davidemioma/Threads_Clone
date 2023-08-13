"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

interface Props {
  text: string;
  authorId: string;
  communityClerkId: string | null;
}

export const createThread = async ({
  text,
  authorId,
  communityClerkId,
}: Props) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (communityClerkId) {
      const community = await prismadb.community.findFirst({
        where: {
          clerkId: communityClerkId,
        },
      });

      await prismadb.thread.create({
        data: {
          text,
          author: {
            connect: {
              id: authorId,
            },
          },
          community: {
            connect: {
              id: community?.id,
            },
          },
        },
      });
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
