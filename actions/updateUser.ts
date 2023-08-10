"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

interface Props {
  name: string;
  username: string;
  bio: string;
  profile_img: string;
}

export const updateUser = async ({
  name,
  username,
  bio,
  profile_img,
}: Props) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const userExists = await prismadb.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (!userExists) {
      await prismadb.user.create({
        data: {
          clerkId: userId,
          name,
          username: username.toLowerCase(),
          bio,
          image: profile_img,
        },
      });
    } else {
      await prismadb.user.update({
        where: {
          id: userExists?.id,
          clerkId: userId,
        },
        data: {
          name,
          username: username.toLowerCase(),
          bio,
          image: profile_img,
          onboarded: true,
        },
      });
    }
  } catch (err: any) {
    throw new Error(`Failed to create/update user: ${err.message}`);
  }
};
