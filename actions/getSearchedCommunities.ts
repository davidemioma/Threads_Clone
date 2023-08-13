"use server";

import prismadb from "@/lib/prismadb";

interface Props {
  searchQuery?: string;
  pageNumber: number;
  pageSize: number;
}

export const getSearchedCommunities = async ({
  searchQuery = "",
  pageNumber = 1,
  pageSize = 20,
}: Props) => {
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    let query: any;

    if (searchQuery.trim() !== "") {
      query = {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      };
    } else {
      query = {};
    }

    const communities = await prismadb.community.findMany({
      skip: skipAmount,
      take: pageSize,
      where: query,
      include: {
        members: true,
      },
      orderBy: {
        name: "desc",
      },
    });

    const totalCommunities = await prismadb.community.count({
      where: query,
    });

    const totalPages = Math.ceil(totalCommunities / pageSize);

    const hasMorePages = pageNumber < totalPages;

    const result = { communities, hasMorePages };

    return result;
  } catch (err) {
    return [];
  }
};
