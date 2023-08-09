import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="flex">
        <LeftSidebar />

        <div className="flex-1 flex justify-center min-h-screen bg-dark-1 text-white px-6 sm:px-10 pt-24">
          <div className="w-full max-w-4xl">{children}</div>
        </div>

        <RightSidebar />
      </main>

      <Footer />
    </>
  );
}
