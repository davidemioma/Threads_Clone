"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { deleteThread } from "@/actions/deleteThread";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  threadId: string;
  authorId: string;
  currentUserId: string;
  parentId: string | null;
  isComment?: boolean;
}

const DeleteThread = ({
  threadId,
  authorId,
  currentUserId,
  parentId,
  isComment,
}: Props) => {
  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const onDeleteHandler = async () => {
    setLoading(true);

    try {
      await deleteThread({ id: threadId });

      router.refresh();

      if (!parentId || !isComment) {
        router.push("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (authorId !== currentUserId || pathname === "/") {
    return null;
  }

  return (
    <button
      className="relative w-5 h-5 overflow-hidden disabled:cursor-not-allowed"
      onClick={onDeleteHandler}
      disabled={loading}
    >
      <Image className="object-cover" src="/assets/delete.svg" fill alt="" />
    </button>
  );
};

export default DeleteThread;
