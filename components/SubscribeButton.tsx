"use client";
import { server } from "@/lib/axios";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

export function SubscribeButton({
  username,
  setIsSub,
}: {
  username: string;
  setIsSub: Dispatch<SetStateAction<boolean>>;
}) {
  async function handleSubscribe() {
    setIsSub(true);

    try {
      await server.put("/api/subscribe", { username });
    } catch (error) {
      setIsSub(false);
    }
  }
  return <Button onClick={handleSubscribe}>Subscribe</Button>;
}
