import CreatePost from "@/components/create-post";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">{user && <CreatePost />}</div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">suggest</div>
    </div>
  );
};

export default page;
