import Empty from "@/components/Empty";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/ThreadCard";
import { getThreads } from "@/actions/getThreads";
import { getUserByClerkId } from "@/actions/getUserByClerkId";

const PAGE_NUMBER = 1;

const PAGE_SIZE = 20;

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const threads = await getThreads({
    pageNumber: PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Home</h1>

      <div className="mt-9 pb-20">
        {threads.length === 0 ? (
          <Empty text="No threads found" />
        ) : (
          <div className="flex flex-col gap-7">
            {threads.map((thread) => (
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
