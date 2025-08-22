import { getPosts } from "@/actions/post.actions";
import React from "react";
import PostCard from "./post-card";
import { getDbUserId } from "@/actions/user.actions";

const Posts = async () => {
  const posts = await getPosts();
  const userId = await getDbUserId();
  return (
    <div className="grid grid-cols-1 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} userId={userId} />
      ))}
    </div>
  );
};

export default Posts;
