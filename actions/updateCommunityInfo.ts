import prismadb from "@/lib/prismadb";

export const updateCommunityInfo = async (
  communityId: string,
  name: string,
  username: string,
  image: string
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

    await prismadb.community.update({
      where: {
        id: community.id,
      },
      data: {
        name,
        username,
        image,
      },
    });
  } catch (err: any) {
    throw new Error(`Failed to remove member: ${err.message}`);
  }
};
