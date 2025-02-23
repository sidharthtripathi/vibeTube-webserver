"use client";
import { useState } from "react";
import { server } from "@/lib/axios";
import { Button } from "./ui/button";

export function SubscriptionButtonToggle({
  isSubscribed,
  username,
}: {
  isSubscribed: boolean;
  username: string;
}) {
  async function handleSubscribe() {
    setIsSub(true);

    try {
      await server.put("/api/subscribe", { username });
    } catch (error) {
      setIsSub(false);
    }
  }
  async function handleUnsubscribe() {
    setIsSub(false);
    try {
      await server.put("/api/unsubscribe", { username });
    } catch (error) {
      setIsSub(true);
    }
  }
  const [isSub, setIsSub] = useState(isSubscribed);
  if (!isSub) return <Button onClick={handleSubscribe}>Subscribe</Button>;
  else
    return (
      <Button onClick={handleUnsubscribe} variant={"destructive"}>
        Unsubscribe
      </Button>
    );
}
