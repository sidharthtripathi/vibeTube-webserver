"use client";
import { addComment, addReply, getReplies } from "@/app/actions/comments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { timeAgo } from "@/lib/time";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { toast, useToast } from "@/hooks/use-toast";
import { useRecoilValue } from "recoil";
import { userState } from "@/state/userState";

type CommentFormProps = {
  userAvatar: string;
  username: string;
  videoId: string;
};
type CommentFormType = {
  comment: string;
};
export function CommentForm({
  userAvatar,
  username,
  videoId,
}: CommentFormProps) {
  const loggedinUser = useRecoilValue(userState)
  const [comments, setComments] = useState<CommentProp[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CommentFormType>();
  async function submitComment(data: CommentFormType) {
    const { id } = await addComment(videoId, data.comment);
    reset();
    setComments((p) => [
      ...p,
      {
        comment: data.comment,
        replyCount: 0,
        time: new Date(),
        userAvatar: "someavatar",
        username: loggedinUser==null ? "username" : loggedinUser.username,
        id,
      },
    ]);
  }

  return (
    <div>
      <div className="flex gap-3">
        <Avatar>
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          <AvatarImage src={userAvatar} />
        </Avatar>
        <form
          onSubmit={handleSubmit(submitComment)}
          className="grow gap-2 flex flex-col"
        >
          <Textarea
            placeholder="Add a Comment"
            className="w-full"
            {...register("comment", { required: true })}
          />
          <Button className="self-end" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </div>

      <div>
        {comments.map(
          ({ comment, id, replyCount, time, userAvatar, username }) => (
            <Comment
              key={id}
              id={id}
              comment={comment}
              replyCount={replyCount}
              time={time}
              userAvatar={userAvatar}
              username={username}
            />
          )
        )}
      </div>
    </div>
  );
}

type CommentProp = {
  userAvatar: string;
  comment: string;
  time: Date;
  replyCount: number;
  username: string;
  id: string;
};

export function Comment({
  userAvatar,
  username,
  time,
  replyCount,
  comment,
  id,
}: CommentProp) {
  const [replyEnabled, toggleReply] = useState(false);
  return (
    <div className="p-2">
      <div className="flex gap-3 items-start">
        <Avatar>
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          <AvatarImage src={userAvatar} />
        </Avatar>
        <div className="flex flex-col grow">
          <p>
            <span className="text-sm">@{username}</span>{" "}
            <span className="text-xs text-muted-foreground">
              {timeAgo.format(time)}
            </span>
          </p>
          <p className="text-sm">{comment}</p>

          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => {
              toggleReply((p) => !p);
            }}
            className="self-end"
          >
            reply
          </Button>
          {replyEnabled && (
            <div>
              <ReplyForm commentId={id} />
              {replyCount > 0 && (
                <Accordion type="single" collapsible className="w-fit">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>replies</AccordionTrigger>
                    <AccordionContent>
                      <RepliesList commentId={id} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RepliesList({ commentId }: { commentId: string }) {
  const {toast} = useToast()
  const [replies, setReplies] = useState<CommentProp[]>([]);
  useEffect(() => {
    async function fetchReplies() {
      const replies = await getReplies(commentId);
      const replyArr: CommentProp[] = replies.map((reply) => ({
        userAvatar: reply.author.avatar!,
        username: reply.author.username,
        id: reply.id,
        time: reply.createdAt,
        comment: reply.comment,
        replyCount: reply.replyCount,
      }));
      setReplies(replyArr);
    }
    fetchReplies();
  }, [commentId]);
  return (
    <div>
      {replies.map(
        ({ comment, id, replyCount, time, userAvatar, username }) => (
          <Comment
            comment={comment}
            replyCount={replyCount}
            id={id}
            key={id}
            time={time}
            userAvatar={userAvatar}
            username={username}
          />
        )
      )}
    </div>
  );
}

type ReplyForm = { reply: string };
function ReplyForm({ commentId }: { commentId: string }) {
  const [replies, setReplies] = useState<CommentProp[]>([]);
  const { register, handleSubmit, reset } = useForm<ReplyForm>();
  async function postReply(data: ReplyForm) {
    try {
      const {id,avatar,username} = await addReply(data.reply, commentId);
  
      setReplies((p) => [
        ...p,
        {
          comment: data.reply,
          id,
          replyCount: 0,
          time: new Date(),
          username,
          userAvatar: avatar!,
        },
      ]);
    } catch (error) {
      toast({value :"Login first",variant : "destructive"})
    }
    reset();
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(postReply)}
        className="flex flex-col gap-2 p-2"
      >
        <Input
          placeholder="Add a reply"
          {...register("reply", { required: true })}
        />
        <Button variant={"secondary"} size={"sm"} className="self-end text-xs">
          submit
        </Button>
      </form>
      <div>
        {replies.map(
          ({ comment, id, replyCount, time, userAvatar, username }) => (
            <Comment
              comment={comment}
              id={id}
              replyCount={replyCount}
              time={time}
              userAvatar={userAvatar}
              username={username}
              key={id}
            />
          )
        )}
      </div>
    </div>
  );
}
