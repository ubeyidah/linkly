import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MessageCircleIcon, SendIcon } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { getDbUser } from "@/actions/user.actions";
import { Separator } from "./ui/separator";
import { SignInButton } from "@clerk/nextjs";

const Comments = async ({ commentCount }: { commentCount: number }) => {
  const user = await getDbUser();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground gap-2 hover:text-blue-500 text-sm"
          >
            <MessageCircleIcon
              className={`size-5 ${false ? "fill-blue-500 text-blue-500" : ""}`}
            />
            <span>{commentCount}</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetContent className="px-3 pt-12">
              {user ? (
                <div className="flex space-x-3">
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarImage src={user?.image || ""} />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" className="flex items-center gap-2">
                        <SendIcon className="size-4" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <SignInButton>
                    <Button className="w-full" variant={"outline"}>
                      Sign in to comment
                    </Button>
                  </SignInButton>
                </div>
              )}
              <Separator className="my-1" />
            </SheetContent>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Comments;
