"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Community, User } from "@prisma/client";

interface Props {
  data: User | Community;
  isCommunity?: boolean;
}

const UserCard = ({ data, isCommunity }: Props) => {
  const router = useRouter();

  const onClickHandler = () => {
    if (isCommunity) {
      router.push(`/communities/${data?.id}`);
    } else {
      router.push(`/profile/${data?.clerkId}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-start xs:flex-row xs:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full shadow-2xl overflow-hidden">
          <Image className="object-cover" src={data?.image} fill alt="" />
        </div>

        <div className="flex-1">
          <h2 className="text-light-1 text-lg font-bold">{data?.name}</h2>

          <p className="text-gray-1 text-sm">@{data?.username}</p>
        </div>
      </div>

      <Button
        className="bg-primary-500 h-auto w-full xs:w-[74px] text-sm text-light-1 rounded-lg"
        onClick={onClickHandler}
      >
        View
      </Button>
    </div>
  );
};

export default UserCard;
