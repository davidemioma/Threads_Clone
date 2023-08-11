import Link from "next/link";
import Image from "next/image";
import Empty from "@/components/Empty";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { getActivity } from "@/actions/getActivities";
import { getUserByClerkId } from "@/actions/getUserByClerkId";

export default async function ActivityPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserByClerkId(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const activities = await getActivity(userInfo.id);

  return (
    <>
      <h1 className="text-2xl font-bold">Activity</h1>

      <div className="mt-10 pb-20">
        {activities.length > 0 ? (
          <div className="flex flex-col gap-7">
            {activities.map((activity) => (
              <Link key={activity.id} href={`/thread/${activity.parentId}`}>
                <div className="bg-dark-2 flex items-center gap-2 px-7 py-4 rounded-md">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden">
                    <Image
                      className="object-cover"
                      src={activity.author.image}
                      alt="user_logo"
                      fill
                    />
                  </div>

                  <p className="text-light-1 text-sm xs:text-base">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Empty text="No activity yet" />
        )}
      </div>
    </>
  );
}
