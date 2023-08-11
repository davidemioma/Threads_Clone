"use server";

import prismadb from "@/lib/prismadb";

interface Props {
  userId: string;
  searchQuery?: string;
  pageNumber: number;
  pageSize: number;
}

export const getSearchedUsers = async ({
  userId,
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
        NOT: {
          id: userId,
        },
      };
    } else {
      query = {
        NOT: {
          id: userId,
        },
      };
    }

    const users = await prismadb.user.findMany({
      skip: skipAmount,
      take: pageSize,
      where: query,
      orderBy: {
        name: "desc",
      },
    });

    const totalUsers = await prismadb.user.count({
      where: query,
    });

    const totalPages = Math.ceil(totalUsers / pageSize);

    const hasMorePages = pageNumber < totalPages;

    const result = { users, hasMorePages };

    return result;
  } catch (err) {
    return [];
  }
};
