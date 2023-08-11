import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId } from "@/actions/getUserByClerkId";

export default async function CommunitiesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Communities</h1>
    </>
  );
}
