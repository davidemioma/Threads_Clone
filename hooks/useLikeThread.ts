import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { likeThread } from "@/actions/likeThread";
import { CurrentUser, ThreadProps } from "@/types/prisma";

interface Props {
  currentUser: CurrentUser | null;
  thread: ThreadProps;
}

const useLikeThread = ({ currentUser, thread }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    setHasLiked(thread?.likedIds?.includes(currentUser.id));
  }, [currentUser, thread]);

  const handleLike = async () => {
    setLoading(true);

    try {
      await likeThread({
        currentUser,
        threadId: thread.id,
        hasLiked,
      });

      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLike, hasLiked };
};

export default useLikeThread;
