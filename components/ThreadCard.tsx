"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteThread from "./DeleteThread";
import { usePathname } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import { formatDateString } from "@/lib/utils";
import useLikeThread from "@/hooks/useLikeThread";
import { CurrentUser, ThreadProps } from "@/types/prisma";
import { getChildrenThread } from "@/actions/getChildrenThread";

interface Props {
  currentUser: CurrentUser | null;
  thread: ThreadProps;
  isComment?: boolean;
  commentsLength?: number;
}

const ThreadCard = ({
  currentUser,
  thread,
  isComment,
  commentsLength,
}: Props) => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  const [comments, setComments] = useState<ThreadProps[]>([]);

  const { loading, hasLiked, handleLike } = useLikeThread({
    currentUser,
    thread: thread!,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  //Not goood pratice just had to do for now
  useEffect(() => {
    const getComments = async () => {
      const threads = await getChildrenThread(thread.id);

      setComments(threads);
    };

    getComments();
  }, [thread.id]);

  if (!mounted) return null;

  return (
    <div
      className={`${
        isComment ? "px-2 xs:px-5 sm:px-7" : "bg-dark-2 p-5 sm:p-7"
      } w-full flex flex-col rounded-xl`}
    >
      <div className="flex justify-between">
        <div className="w-full flex-1 grid-container gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${thread?.author.clerkId}`}
              className="relative h-10 w-10 rounded-full overflow-hidden"
            >
              <Image
                className="object-cover"
                src={thread?.author.image!}
                fill
                alt=""
              />
            </Link>

            <div className="bg-neutral-800 w-0.5 grow mt-2" />
          </div>

          <div className="flex flex-col">
            <Link href={`/profile/${thread.author.clerkId}`} className="w-fit">
              <h4 className="font-bold text-light-1">{thread.author.name}</h4>
            </Link>

            <p
              className={`text-xs xs:text-sm ${
                pathname === "/" && "line-clamp-2 sm:line-clamp-3"
              } text-light-2 mt-1`}
            >
              {thread.text}
            </p>

            <div className={`flex flex-col gap-3 mt-5 ${isComment && "mb-10"}`}>
              <div className="flex items-center gap-3">
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

              {isComment && commentsLength! > 0 && (
                <Link href={`/thread/${thread.id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {commentsLength} repl{commentsLength! > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={thread.id}
          authorId={thread.author.id}
          currentUserId={currentUser?.id!}
          parentId={thread.parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="flex items-center gap-2 ml-1 mt-3 ">
          {comments.slice(0, 2).map((comment, index) => (
            <div
              key={index}
              className={`relative w-6 h-6 ${
                index !== 0 && "-ml-5"
              } rounded-full overflow-hidden`}
            >
              <Image
                className="object-cover"
                src={comment.author.image}
                alt=""
                fill
              />
            </div>
          ))}

          <Link href={`/thread/${thread.id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && !thread.community && (
        <p className="mt-5 text-sm text-gray-1">
          {formatDateString(thread.createdAt.toISOString())}
        </p>
      )}

      {!isComment && thread.community && (
        <Link
          href={`/communities/${thread.community.id}`}
          className="flex items-center gap-1 mt-5 text-xs xs:text-sm"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(thread.createdAt.toISOString())} -{" "}
            {thread.community.name} Community
          </p>

          <div className="relative flex-shrink-0 w-5 h-5 rounded-full overflow-hidden">
            <Image
              className="object-cover"
              src={thread.community.image}
              fill
              alt={thread.community.name}
            />
          </div>
        </Link>
      )}
    </div>
  );
};

export default ThreadCard;
