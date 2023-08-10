"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import useLikeThread from "@/hooks/useLikeThread";
import { CurrentUser, ThreadProps } from "@/types/prisma";

interface Props {
  currentUser: CurrentUser | null;
  thread: ThreadProps;
}

const ThreadCard = ({ currentUser, thread }: Props) => {
  const { loading, hasLiked, handleLike } = useLikeThread({
    currentUser,
    thread,
  });

  return (
    <div className="bg-dark-2 p-5 sm:p-7 w-full flex flex-col rounded-xl">
      <div className="w-full grid-container gap-4">
        <div className="flex flex-col items-center">
          <Link
            href={`/profile/${thread.author.id}`}
            className="relative h-10 w-10 rounded-full overflow-hidden"
          >
            <Image
              className="object-cover"
              src={thread.author.image}
              fill
              alt=""
            />
          </Link>

          <div className="bg-neutral-800 w-0.5 grow mt-2" />
        </div>

        <div className="flex flex-col">
          <Link href={`/profile/${thread.author.id}`} className="w-fit">
            <h4 className="font-bold text-light-1">{thread.author.name}</h4>
          </Link>

          <p className="text-sm text-light-2 mt-1">{thread.text}</p>

          <div className="flex items-center gap-3 mt-5">
            <button disabled={loading} onClick={handleLike}>
              {hasLiked ? (
                <AiFillHeart className="text-red-500" size={20} />
              ) : (
                <div className="relative w-6 h-6 overflow-hidden">
                  <Image
                    className="object-cover"
                    src="/assets/heart-gray.svg"
                    fill
                    alt=""
                  />
                </div>
              )}
            </button>

            <Link
              href={`/thread/${thread.id}`}
              className="relative w-6 h-6 overflow-hidden"
            >
              <Image
                className="object-cover"
                src="/assets/reply.svg"
                fill
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>

      {/* <div>booty</div> */}
    </div>
  );
};

export default ThreadCard;
