import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import AccountProfile from "@/components/AccountProfile";

export default async function Edit({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  const userData = {
    id: userInfo?.id,
    clerkId: user.id,
    name: (userInfo?.name || user.firstName) ?? "",
    username: userInfo?.username || user.username,
    bio: userInfo?.bio || "",
    image: userInfo?.image || user.imageUrl,
  };

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      <p className="mt-3 text-light-2">Make any changes</p>

      <div className="w-full mt-10 pb-20">
        <AccountProfile user={userData} btnTitle="Continue" />
      </div>
    </>
  );
}
