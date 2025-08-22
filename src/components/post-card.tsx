import { getPosts } from "@/actions/post.actions";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MessageCircleIcon } from "lucide-react";
import LikeButton from "./like-btn";
import { timeAgo } from "@/lib/time-ago";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];
const PostCard = ({ post, userId }: { post: Post; userId: string | null }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex space-x-3 sm:space-x-4">
          <Link href={`/profile/${post.author.username}`}>
            <Avatar className="size-8 sm:w-10 sm:h-10">
              <AvatarImage src={post.author.image ?? "/avatar.png"} />
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                <h4 className="font-semibold truncate">{post.author.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link href={`/profile/${post.author.username}`}>
                    @{post.author.username}
                  </Link>
                  <span>•</span>
                  <span>{timeAgo(post.createdAt)}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground break-words">
              {post.content}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4">
          {/* POST IMAGE */}
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* LIKE & COMMENT BUTTONS */}
          <div className="flex items-center pt-2 space-x-4">
            <LikeButton
              like={post.like}
              postAuthorId={post.author.id}
              userId={userId}
              postId={post.id}
              likeCount={post._count.like}
            />

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-blue-500"
            >
              <MessageCircleIcon
                className={`size-5 ${
                  false ? "fill-blue-500 text-blue-500" : ""
                }`}
              />
              <span>{post.comments.length}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
