import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { SubscriptionButtonToggle } from "./SubscriptionButtonToggle";

export async function SubscriptionStatus({username}  : {username : string}){
    const loggedinUser = headers().get("username")
        if(!loggedinUser) return null
        const user = await prisma.user.findUnique({
            where : {username},
            select : {subscribers : {where : {username : loggedinUser},select : {id : true}}}
        })
        const isSubscribed = Boolean(user?.subscribers.length)
        return <SubscriptionButtonToggle  isSubscribed = {isSubscribed} username={username}/>
}
