import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { CommunityProps } from "@/types/prisma";

interface Props {
  community: CommunityProps;
}

const CommunityCard = ({ community }: Props) => {
  return (
    <div className="bg-dark-3 flex flex-col gap-5 w-full sm:w-96 px-4 py-5 rounded-lg">
      <div className="flex items-center gap-3">
        <Link
          href={`/communities/${community.id}`}
          className="relative h-9 w-9 sm:w-12 sm:h-12 flex-shrink-0 rounded-full overflow-hidden"
        >
          <Image className="object-cover" src={community.image!} fill alt="" />
        </Link>

        <div>
          <Link href={`/communities/${community.id}`}>
            <p className="font-semibold text-light-1">{community.name}</p>
          </Link>

          <p className="text-sm text-gray-1">@{community.username}</p>
        </div>
      </div>

      <span className="text-gray-1 text-sm">{community.bio}</span>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={`/communities/${community.id}`}>
          <Button
            size="sm"
            className="rounded-lg bg-primary-500 text-light-1 px-5 py-1.5"
          >
            View
          </Button>
        </Link>

        {community.members.length > 0 && (
          <div className="flex items-center gap-1">
            {community.members.slice(0, 2).map((member, index) => (
              <div
                key={index}
                className={`relative w-7 h-7 ${
                  index !== 0 && "-ml-2"
                } rounded-full overflow-hidden`}
              >
                <Image
                  className="object-cover"
                  src={member.image}
                  fill
                  alt=""
                />
              </div>
            ))}

            {community.members.length > 3 && (
              <p className="font-medium text-gray-1">
                {community.members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
