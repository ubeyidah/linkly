"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";

const FollowButton = ({ userToFollowId }: { userToFollowId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.log("error while follow", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button variant={"secondary"} onClick={handleFollow} disabled={isLoading}>
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
};

export default FollowButton;
