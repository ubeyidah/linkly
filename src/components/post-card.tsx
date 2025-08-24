import { getPosts } from "@/actions/post.actions";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import LikeButton from "./like-btn";
import { timeAgo } from "@/lib/time-ago";
import Comments from "./comment";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];
const PostCard = ({ post, userId }: { post: Post; userId: string | null }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="size-8 sm:w-10 sm:h-10">
                <AvatarImage src={post.author.image ?? "/avatar.png"} />
              </Avatar>
            </Link>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col truncate">
                <h4 className="font-semibold truncate">{post.author.name}</h4>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Link href={`/profile/${post.author.username}`}>
                    @{post.author.username}
                  </Link>
                  <span>•</span>
                  <span>{timeAgo(post.createdAt)}</span>
                </div>
              </div>
              <Button size={"icon"} variant={"ghost"}>
                <EllipsisVertical />
              </Button>
            </div>

            <div>
              <p className="mt-3 text-sm text-foreground break-words">
                {post.content}
              </p>
              <div className="mt-4 py-3">
                {/* POST IMAGE */}
                {post.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full object-cover"
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

                  <Comments
                    commentCount={post._count.comments}
                    postId={post.id}
                    postAuthorId={post.author.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
