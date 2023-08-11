import prismadb from "@/lib/prismadb";

export const getActivity = async (userId: string) => {
  try {
    if (!userId) return [];

    const userThreadIds = await prismadb.thread.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
      },
    });

    const replyThreads = await prismadb.thread.findMany({
      where: {
        parentId: {
          in: [...userThreadIds.map((thread) => thread.id)],
        },
        NOT: {
          author: {
            id: userId,
          },
        },
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return replyThreads;
  } catch (err: any) {
    throw new Error(`Error fetching activities: ${err.message}`);
  }
};
