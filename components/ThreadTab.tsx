import React from "react";
import ThreadCard from "./ThreadCard";
import { redirect } from "next/navigation";
import { CurrentUser, ThreadProps } from "@/types/prisma";
import { getThreadsByUserId } from "@/actions/getThreadsByUserId";
import { getThreadsByCommunityId } from "@/actions/getThreadsByCommunityId";

interface Props {
  value: string;
  accountType: string;
  profileId: string;
  currentUser: CurrentUser | null;
}

const ThreadTab = async ({
  value,
  accountType,
  profileId,
  currentUser,
}: Props) => {
  let threads: ThreadProps[];

  if (accountType === "Community") {
    threads = await getThreadsByCommunityId(profileId);
  } else {
    threads = await getThreadsByUserId({
      id: profileId,
      replies: value === "replies",
    });
  }

  if (!threads) {
    redirect("/");
  }

  return (
    <div className="mt-9 flex flex-col gap-8">
      {threads?.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default ThreadTab;
