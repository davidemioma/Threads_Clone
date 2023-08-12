"use server";

import prismadb from "@/lib/prismadb";

export const getCommunityByClerkId = async (id: string) => {
  try {
    if (!id) return null;

    const community = await prismadb.community.findFirst({
      where: {
        id,
      },
      include: {
        members: true,
      },
    });

    return community;
  } catch (err) {
    return null;
  }
};

export const threadsCount = async (id: string) => {
  try {
    if (!id) return 0;

    const count = await prismadb.thread.count({
      where: {
        communityId: id,
      },
    });

    return count;
  } catch (err) {
    return 0;
  }
};
