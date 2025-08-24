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
import { getComments } from "@/actions/post.actions";
import { timeAgo } from "@/lib/time-ago";
import CommentForm from "./comment-form";

const Comments = async ({
  commentCount,
  postId,
  postAuthorId,
}: {
  commentCount: number;
  postId: string;
  postAuthorId: string;
}) => {
  const user = await getDbUser();
  const comments = await getComments(postId);
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
              <CommentForm
                auth={!!user}
                imageUrl={user?.image ?? ""}
                postId={postId}
                authorId={postAuthorId}
              />
              <Separator className="my-1" />
              <div className="flex flex-col gap-5">
                {comments?.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="size-8 flex-shrink-0 mt-2">
                      <AvatarImage
                        src={comment.author.image ?? "/avatar.png"}
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start flex-col gap-x-2">
                        <span className="font-medium text-sm">
                          {comment.author.name}
                        </span>
                        <p>
                          {" "}
                          <span className="text-sm text-muted-foreground">
                            @{comment.author.username}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {" · "}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {timeAgo(new Date(comment.createdAt))}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm break-words mt-1">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Comments;
