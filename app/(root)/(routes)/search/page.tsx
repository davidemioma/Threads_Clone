import Empty from "@/components/Empty";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/UserCard";
import SearchBar from "@/components/SearchBar";
import { UserResultProps } from "@/types/prisma";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/constants";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { getSearchedUsers } from "@/actions/getSearchedUsers";

interface Props {
  searchParams: { q: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  // @ts-ignore
  const result: UserResultProps = await getSearchedUsers({
    userId: userInfo.id,
    searchQuery: searchParams.q,
    pageNumber: PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-10">Search</h1>

      <SearchBar routeType="search" placeholder="Search Users..." />

      <div className="mt-14 pb-20">
        {result.users.length === 0 ? (
          <Empty text="No Result" />
        ) : (
          <div className="flex flex-col gap-7">
            {result.users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
