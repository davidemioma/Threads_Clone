import { redirect } from "next/navigation";
import Comment from "@/components/Comment";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/ThreadCard";
import CommentForm from "@/components/CommentForm";
import { getThreadById } from "@/actions/getThreadById";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { getChildrenThread } from "@/actions/getChildrenThread";

export default async function ThreadPage({
  params,
}: {
  params: {
    threadId: string;
  };
}) {
  const { threadId } = params;

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const thread = await getThreadById(threadId);

  if (!thread) {
    redirect("/");
  }

  const commentsThread = await getChildrenThread(threadId);

  return (
    <div className="flex flex-col gap-10 pb-28">
      <ThreadCard thread={thread} currentUser={userInfo} />

      <CommentForm
        userId={userInfo.id}
        threadId={threadId as string}
        currentUserImage={userInfo.image}
      />

      <div className="flex flex-col">
        {commentsThread.map((thread) => (
          // @ts-ignore
          <Comment key={thread.id} thread={thread} currentUser={userInfo} />
        ))}
      </div>
    </div>
  );
}
