import Empty from "@/components/Empty";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/ThreadCard";
import { getHaveMorePages, getThreads } from "@/actions/getThreads";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/constants";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import Pagination from "@/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const threads = await getThreads({
    pageNumber: +searchParams.page || PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  });

  const hasMorePages = await getHaveMorePages({
    pageNumber: +searchParams.page || PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Home</h1>

      <div className="mt-9">
        {threads.length === 0 ? (
          <Empty text="No threads found" />
        ) : (
          <div className="flex flex-col gap-7">
            {threads.map((thread) => {
              return (
                <ThreadCard
                  key={thread.id}
                  currentUser={userInfo}
                  thread={thread}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="w-full pb-20">
        <Pagination
          pageNumber={+searchParams.page || PAGE_NUMBER}
          isNext={hasMorePages}
          path="/"
        />
      </div>
    </>
  );
}
