import Empty from "@/components/Empty";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { ThreadProps } from "@/types/prisma";
import { getThreads } from "@/actions/getThreads";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import ThreadCard from "@/components/ThreadCard";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const result: any = await getThreads({
    pageNumber: 1,
    pageSize: 20,
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Home</h1>

      <div className="mt-9">
        {result.threads.length === 0 ? (
          <Empty text="No threads found" />
        ) : (
          <div className="flex flex-col gap-5">
            {result.threads.map((thread: ThreadProps) => (
              <ThreadCard
                key={thread.id}
                currentUser={userInfo}
                thread={thread}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
