import CreatePost from "@/components/create-post";
import Posts from "@/components/posts";
import SuggestedUsers from "@/components/SuggestedUsers";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <CreatePost />

        <div className="py-4">
          <Suspense fallback="loading posts">
            <Posts />
          </Suspense>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <Suspense fallback={"Loading users...."}>
          <SuggestedUsers />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
