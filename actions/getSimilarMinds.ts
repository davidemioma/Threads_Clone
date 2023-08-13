"use server";

import prismadb from "@/lib/prismadb";

interface Props {
  userId: string;
  pageSize: number;
}

export const getSimilarMinds = async ({ userId, pageSize }: Props) => {
  try {
    const totalUsers = await prismadb.user.count();

    const randomOffset = Math.floor(Math.random() * totalUsers);

    const users = await prismadb.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      take: pageSize,
      skip: randomOffset,
    });

    return users;
  } catch (err) {
    return [];
  }
};
