"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { toggleLike } from "@/actions/post.actions";
import { cn } from "@/lib/utils";

const LikeButton = ({
  postId,
  postAuthorId,
  like,
  userId,
  likeCount,
}: {
  postId: string;
  postAuthorId: string;
  like: { userId: string }[];
  userId: string | null;
  likeCount: number;
}) => {
  const { user } = useUser();
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    like.some((like) => like.userId === userId)
  );
  const [optimisticLikes, setOptmisticLikes] = useState(likeCount);
  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptmisticLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
      const res = await toggleLike(postId, postAuthorId);
      if (!res.success) {
        console.log("unable to like the post");
      }
    } catch (error) {
      console.log("error while like the post ", error);
    } finally {
      setIsLiking(false);
    }
  };
  if (!user) {
    return (
      <SignInButton mode="modal">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground gap-1"
        >
          <HeartIcon className="size-5" />
          <span>{optimisticLikes}</span>
        </Button>
      </SignInButton>
    );
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className={cn({
        "text-muted-foreground gap-1 hover:text-red-500": true,
        "text-red-500 hover:text-red-600": hasLiked,
      })}
    >
      {hasLiked ? (
        <HeartIcon className="size-5 fill-current" />
      ) : (
        <HeartIcon className="size-5" />
      )}
      <span className="text-sm">{optimisticLikes}</span>
    </Button>
  );
};

export default LikeButton;
