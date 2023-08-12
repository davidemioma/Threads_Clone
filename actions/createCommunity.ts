"use server";

import prismadb from "@/lib/prismadb";

export const createCommunity = async (
  clerkId: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string
) => {
  try {
    const user = await prismadb.user.findFirst({
      where: {
        clerkId: createdById,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prismadb.community.create({
      data: {
        clerkId,
        name,
        username,
        image,
        bio,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (err: any) {
    throw new Error(`Failed to create community: ${err.message}`);
  }
};
