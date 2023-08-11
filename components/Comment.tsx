import React from "react";
import ThreadCard from "./ThreadCard";
import { CurrentUser, ThreadProps } from "@/types/prisma";
import { getReplyCount } from "@/actions/getReplyCount";

interface Props {
  thread: ThreadProps;
  currentUser: CurrentUser | null;
}

const Comment = async ({ thread, currentUser }: Props) => {
  const replyCount = await getReplyCount(thread.id);

  return (
    <ThreadCard
      thread={thread}
      currentUser={currentUser}
      isComment
      commentsLength={replyCount}
    />
  );
};

export default Comment;
