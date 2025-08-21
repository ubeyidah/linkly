import { getSuggestedUsers } from "@/actions/user.actions";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import Link from "next/link";

const SuggestedUsers = async () => {
  const suggestedUsers = await getSuggestedUsers();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Find New Friends</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <Avatar className="size-10">
                <AvatarImage src={user.image?.toString()} />
              </Avatar>
              <div>
                <h4 className="-mb-1">{user.name}</h4>
                <Link
                  href={`/profile/${user.username}`}
                  className="text-sm text-muted-foreground hover:underline hover:text-white"
                >
                  @{user.username}
                </Link>
                <p className="text-xs text-muted-foreground">
                  Followers {user._count.followers}
                </p>
              </div>
            </div>
            <Button variant={"outline"}>Follow</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;
