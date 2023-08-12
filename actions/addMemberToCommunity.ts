"use server";

import prismadb from "@/lib/prismadb";

export const addMemberToCommunity = async (
  communityId: string,
  memberId: string
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
        clerkId: memberId,
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
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (err: any) {
    throw new Error(`Failed to add member: ${err.message}`);
  }
};
