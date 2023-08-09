import { getUserById } from "@/actions/getUserById";
import AccountProfile from "@/components/AccountProfile";
import { currentUser } from "@clerk/nextjs";

export default async function Onboarding() {
  const user = await currentUser();

  const userInfo = await getUserById(user?.id);

  return (
    <div className="w-full h-full max-w-3xl mx-auto py-20 px-10">
      <h1 className="text-2xl text-light-1 font-bold">Onboarding</h1>

      <p className="text-light-2 text-sm mt-3">
        Complete your profile now to use Threads.
      </p>

      <div className="bg-dark-2 p-10 mt-9">
        <AccountProfile user={{}} btnTitle="Continue" />
      </div>
    </div>
  );
}
