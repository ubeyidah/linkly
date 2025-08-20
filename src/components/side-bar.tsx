import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Unauthenticated from "./unauthenticated";
import { getUserByClerkId } from "@/actions/user.actions";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Sidebar = async () => {
  const authUser = await currentUser();
  if (!authUser) return <Unauthenticated />;
  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return (
    <Card>
      <CardContent className="pt-6 sticky">
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-20 h-20 border-2 ">
            <AvatarImage src={user.image || ""} />
          </Avatar>

          <div className="mt-4 space-y-1">
            <h3 className="font-semibold -mb-1">{user.name}</h3>
            <Link
              href={`/profile/${user.username}`}
              className="text-sm text-muted-foreground hover:underline hover:text-white"
            >
              @{user.username}
            </Link>
          </div>

          {user.bio && (
            <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
          )}

          <div className="w-full">
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{user._count.followings}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
              <Separator orientation="vertical" />
              <div>
                <p className="font-medium">{user._count.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="w-full space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground capitalize">
              <MapPinIcon className="w-4 h-4 mr-2" />
              {user.location || "No location"}
            </div>
            <div className="flex items-center text-muted-foreground">
              <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
              {user.website ? (
                <a
                  href={`${user.website}`}
                  className="hover:underline hover:text-white truncate"
                  target="_blank"
                >
                  {user.website}
                </a>
              ) : (
                "No website"
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
