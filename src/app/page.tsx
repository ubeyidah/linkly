import CreatePost from "@/components/create-post";
import SuggestedUsers from "@/components/SuggestedUsers";
import React, { Suspense } from "react";

const page = async () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <CreatePost />
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
