import Empty from "@/components/Empty";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import SearchBar from "@/components/SearchBar";
import { communityResultProps } from "@/types/prisma";
import CommunityCard from "@/components/CommunityCard";
import { PAGE_NUMBER, PAGE_SIZE } from "@/lib/constants";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { getSearchedCommunities } from "@/actions/getSearchedCommunities";
import Pagination from "@/components/Pagination";

interface Props {
  searchParams: { q: string; page: string };
}

export default async function CommunitiesPage({ searchParams }: Props) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  // @ts-ignore
  const result: communityResultProps = await getSearchedCommunities({
    searchQuery: searchParams.q,
    pageNumber: +searchParams.page || PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-10">Communities</h1>

      <SearchBar routeType="communities" placeholder="Search Communities..." />

      <div className="mt-14">
        {result.communities.length === 0 ? (
          <Empty text="No Result" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-7">
            {result.communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        )}
      </div>

      <div className="w-full pb-20">
        <Pagination
          pageNumber={+searchParams.page || PAGE_NUMBER}
          isNext={result.hasMorePages}
          path="communities"
        />
      </div>
    </>
  );
}
