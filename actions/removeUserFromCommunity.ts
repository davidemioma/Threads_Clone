"use server";

import prismadb from "@/lib/prismadb";

export const removeUserFromCommunity = async (
  userId: string,
  communityId: string
) => {
  try {
    const community = await prismadb.community.findFirst({
      where: {
        clerkId: communityId,
      },
    });

    if (!community) {
      throw new Error("Community not found");
    }

    const user = await prismadb.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prismadb.community.update({
      where: {
        id: community.id,
      },
      data: {
        members: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });
  } catch (err: any) {
    throw new Error(`Failed to remove member: ${err.message}`);
  }
};
