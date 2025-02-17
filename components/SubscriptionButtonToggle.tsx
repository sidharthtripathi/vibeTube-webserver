"use client"

import { useState } from "react"
import { SubscribeButton } from "./SubscribeButton"
import { UnsubscribeButton } from "./UnsubscribeButton"

export function SubscriptionButtonToggle({isSubscribed,username} : {isSubscribed : boolean,username:string}){
    const [isSub,setIsSub] = useState(isSubscribed)
    if(!isSub) return <SubscribeButton username={username} setIsSub={setIsSub} />
    else return <UnsubscribeButton  username={username} setIsSub={setIsSub}/>
}