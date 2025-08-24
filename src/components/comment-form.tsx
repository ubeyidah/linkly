"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";
import { sendComment } from "@/actions/post.actions";

const CommentForm = ({
  auth,
  imageUrl,
  postId,
  authorId,
}: {
  auth: boolean | null;
  imageUrl: string;
  postId: string;
  authorId: string;
}) => {
  const [pending, setPending] = useState(false);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      setPending(true);
      await sendComment(comment, postId, authorId);
      setComment("");
    } catch (error) {
      console.log("error while sending comment", error);
    } finally {
      setPending(false);
    }
  };
  if (auth) {
    return (
      <div className="flex space-x-3">
        <Avatar className="size-8 flex-shrink-0">
          <AvatarImage src={imageUrl} />
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Write a comment..."
            className="min-h-[80px] resize-none"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-end mt-2">
            <Button
              size="sm"
              className="flex items-center gap-2"
              onClick={handleComment}
              disabled={pending}
            >
              {pending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <>
                  <SendIcon className="size-4" />
                  Comment
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <SignInButton>
        <Button className="w-full" variant={"outline"}>
          Sign in to comment
        </Button>
      </SignInButton>
    </div>
  );
};

export default CommentForm;
