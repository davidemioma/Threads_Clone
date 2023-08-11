import Navbar from "@/components/Navbar";
import { currentUser, useAuth } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <>
      <Navbar />

      <main className="flex">
        <LeftSidebar userId={user?.id as string} />

        <div className="flex-1 flex justify-center min-h-screen overflow-y-auto bg-dark-1 text-white px-6 sm:px-10 pt-24">
          <div className="w-full max-w-4xl">{children}</div>
        </div>

        <RightSidebar />
      </main>

      <Footer />
    </>
  );
}
