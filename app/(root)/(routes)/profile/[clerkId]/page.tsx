import Image from "next/image";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { profileTabs } from "@/lib/constants";
import ThreadTab from "@/components/ThreadTab";
import ProfileHeader from "@/components/ProfileHeader";
import { getUserThreadCount } from "@/actions/getThreads";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProfilePage({
  params,
}: {
  params: { clerkId: string };
}) {
  const { clerkId } = params;

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(clerkId);

  const currentUserInfo = await getUserByClerkId(user.id);

  if (!userInfo) {
    redirect("/");
  }

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const userThreadCount = await getUserThreadCount(userInfo.id);

  return (
    <div className="h-full w-full pb-28">
      <ProfileHeader
        userInfo={userInfo}
        clerkId={clerkId}
        currentUserClerkId={user.id}
      />

      <div className="w-full mt-10">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="bg-dark-2 w-full min-h-[50px] flex text-light-2">
            {profileTabs.map((tab) => (
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
                    {userThreadCount}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* @ts-ignore */}
              <ThreadTab
                value={tab.value}
                profileId={userInfo.id}
                currentUser={currentUserInfo}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
