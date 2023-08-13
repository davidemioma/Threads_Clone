import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import PostThread from "@/components/PostThread";

export default async function CreateThread() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user?.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Create Thread</h1>

      <PostThread userId={userInfo?.id!} />
    </>
  );
}
