"use server";

import prismadb from "@/lib/prismadb";

interface Props {
  pageSize: number;
}

export const getSuggestedCommunities = async ({ pageSize }: Props) => {
  try {
    const totalCommunities = await prismadb.community.count();

    const randomOffset = Math.floor(Math.random() * totalCommunities);

    const communities = await prismadb.community.findMany({
      take: pageSize,
      skip: randomOffset,
    });

    return communities;
  } catch (err) {
    return [];
  }
};
