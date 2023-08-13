import Navbar from "@/components/Navbar";
import { currentUser, useAuth } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { getSimilarMinds } from "@/actions/getSimilarMinds";
import { getSuggestedCommunities } from "@/actions/getSuggestedCommunities";

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  const userInfo = await getUserByClerkId(user?.id!);

  const communities = await getSuggestedCommunities({ pageSize: 4 });

  const users = await getSimilarMinds({ userId: userInfo?.id!, pageSize: 4 });

  return (
    <>
      <Navbar />

      <main className="flex">
        <LeftSidebar userId={user?.id as string} />

        <div className="flex-1 flex justify-center min-h-screen overflow-y-auto bg-dark-1 text-white px-6 sm:px-10 pt-24">
          <div className="w-full max-w-4xl">{children}</div>
        </div>

        <RightSidebar users={users} communities={communities} />
      </main>

      <Footer />
    </>
  );
}
