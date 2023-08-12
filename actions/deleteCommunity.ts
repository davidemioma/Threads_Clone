"use server";

import prismadb from "@/lib/prismadb";

export const deleteCommunity = async (communityId: string) => {
  try {
    const community = await prismadb.community.findFirst({
      where: {
        clerkId: communityId,
      },
      include: {
        members: true,
      },
    });

    if (!community) {
      throw new Error("Community not found");
    }

    //Delete Community.
    await prismadb.community.delete({
      where: {
        id: community.id,
      },
    });

    //Delete all Threads in that community.
    await prismadb.thread.deleteMany({
      where: {
        community: {
          id: community.id,
        },
      },
    });

    //Remove users from that community
    const promises = community.members.map(async (member) => {
      await prismadb.user.update({
        where: {
          id: member.id,
        },
        data: {
          communities: {
            disconnect: {
              id: community.id,
            },
          },
        },
      });
    });

    await Promise.all(promises);
  } catch (err: any) {
    throw new Error(`Failed to remove member: ${err.message}`);
  }
};
