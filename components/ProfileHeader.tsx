import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Community, CurrentUser } from "@/types/prisma";

interface Props {
  userInfo: CurrentUser | Community;
  clerkId: string;
  currentUserClerkId: string;
  isCommunity?: boolean;
}

const ProfileHeader = ({
  userInfo,
  clerkId,
  currentUserClerkId,
  isCommunity,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-5 justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl overflow-hidden">
            <Image className="object-cover" src={userInfo?.image} fill alt="" />
          </div>

          <div className="flex-1">
            <h2 className="text-light-1 text-lg font-bold">{userInfo?.name}</h2>

            <p className="text-gray-1">@{userInfo?.username}</p>
          </div>
        </div>

        {clerkId === currentUserClerkId && !isCommunity && (
          <Link href="/profile/edit">
            <div className="bg-dark-3 flex items-center gap-3 px-4 py-2 rounded-lg">
              <div className="relative w-4 h-4 overflow-hidden">
                <Image
                  className="object-cover"
                  src="/assets/edit.svg"
                  fill
                  alt=""
                />
              </div>

              <p className="text-light-2">Edit</p>
            </div>
          </Link>
        )}
      </div>

      <span className="max-w-lg text-light-2">{userInfo?.bio}</span>

      <div className="bg-dark-3 h-0.5 w-full mt-7 sm:mt-10" />
    </div>
  );
};

export default ProfileHeader;
