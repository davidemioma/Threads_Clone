import Image from "next/image";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/UserCard";
import ThreadTab from "@/components/ThreadTab";
import { communityTabs } from "@/lib/constants";
import ProfileHeader from "@/components/ProfileHeader";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCommunityByClerkId,
  threadsCount,
} from "@/actions/getCommunityByClerkId";

export default async function Community({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const community = await getCommunityByClerkId(id);

  const count = await threadsCount(id);

  return (
    <div className="h-full w-full pb-28">
      <ProfileHeader
        userInfo={community!}
        clerkId={community?.createdById!}
        currentUserClerkId={userInfo.id}
        isCommunity
      />

      <div className="w-full mt-10">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="bg-dark-2 w-full min-h-[50px] flex text-light-2">
            {communityTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="min-h-[50px] w-full flex flex-1 gap-3 items-center bg-dark-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2"
              >
                <div className="relative w-6 h-6 overflow-hidden">
                  <Image
                    className="object-cover"
                    src={tab.icon}
                    alt={tab.label}
                    fill
                  />
                </div>

                <p className="hidden xs:inline">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="bg-light-4 px-2 py-0.5 text-light-2 text-xs ml-1 rounded-sm">
                    {count}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            {/* @ts-ignore */}
            <ThreadTab
              profileId={community?.id!}
              currentUser={userInfo}
              accountType="Community"
              value=""
            />
          </TabsContent>

          <TabsContent value="members" className="w-full text-light-1">
            <div className="flex flex-col gap-8 mt-9">
              {community?.members.map((user) => (
                <UserCard key={user.id} data={user} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
