import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import AccountProfile from "@/components/AccountProfile";
import { getUserByClerkId } from "@/actions/getUserByClerkId";

export default async function Onboarding() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user?.id);

  const userData = {
    id: userInfo?.id,
    clerkId: user.id,
    name: (userInfo?.name || user.firstName) ?? "",
    username: userInfo?.username || user.username,
    bio: userInfo?.bio || "",
    image: userInfo?.image || user.imageUrl,
  };

  if (userInfo?.onboarded) {
    redirect("/");
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto py-20 px-10">
        <h1 className="text-2xl text-light-1 font-bold">Onboarding</h1>

        <p className="text-light-2 text-sm mt-3">
          Complete your profile now to use Threads.
        </p>

        <div className="bg-dark-2 p-6 md:p-10 mt-9">
          <AccountProfile user={userData} btnTitle="Continue" />
        </div>
      </div>
    </div>
  );
}
