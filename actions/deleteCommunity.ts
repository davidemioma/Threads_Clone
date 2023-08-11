import prismadb from "@/lib/prismadb";

export const deleteCommunity = async (communityId: string) => {
  try {
    const community = await prismadb.community.findFirst({
      where: {
        clerkId: communityId,
      },
    });

    if (!community) {
      throw new Error("Community not found");
    }

    const members = await prismadb.user.findMany({
      where: {
        communitiesId: {
          has: community.id,
        },
      },
    });

    members.forEach(async (user) => {
      await prismadb.user.update({
        where: {
          id: user.id,
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

    await prismadb.thread.deleteMany({
      where: {
        community: {
          id: community.id,
        },
      },
    });

    await prismadb.community.delete({
      where: {
        id: community.id,
      },
    });
  } catch (err: any) {
    throw new Error(`Failed to remove member: ${err.message}`);
  }
};
