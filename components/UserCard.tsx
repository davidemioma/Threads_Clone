"use client";

import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
  isCommunity?: boolean;
}

const UserCard = ({ user, isCommunity }: Props) => {
  const router = useRouter();

  const onClickHandler = () => {
    if (isCommunity) {
      router.push(`/communities/${user.clerkId}`);
    } else {
      router.push(`/profile/${user.clerkId}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-start xs:flex-row xs:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full shadow-2xl overflow-hidden">
          <Image className="object-cover" src={user.image} fill alt="" />
        </div>

        <div className="flex-1">
          <h2 className="text-light-1 text-lg font-bold">{user.name}</h2>

          <p className="text-gray-1 text-sm">@{user.username}</p>
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
