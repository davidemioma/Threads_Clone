import prismadb from "@/lib/prismadb";

export const getReplyCount = async (threadId: string) => {
  const replyCount = await prismadb.thread.count({
    where: {
      parentId: threadId,
    },
  });

  return replyCount;
};
