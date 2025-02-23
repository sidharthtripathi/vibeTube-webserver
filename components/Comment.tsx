"use client";
import { addComment } from "@/app/actions/comments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { timeAgo } from "@/lib/time";
import { useState } from "react";

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
        username: "someusername",
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
          <Button size={"sm"} className="self-end" disabled={isSubmitting}>
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
}: CommentProp) {
  return (
    <div className="p-2">
      <div className="flex gap-3 items-start">
        <Avatar>
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          <AvatarImage src={userAvatar} />
        </Avatar>
        <div>
          <p>
            <span className="text-sm">@{username}</span>{" "}
            <span className="text-xs text-muted-foreground">
              {timeAgo.format(time)}
            </span>
          </p>
          <p>{comment}</p>
        </div>
      </div>
      {replyCount > 0 && (
        <div className="ml-4 mt-4">fetch replies here then</div>
      )}
    </div>
  );
}
