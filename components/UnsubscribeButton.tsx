"use client"
import { server } from "@/lib/axios";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

export  function UnsubscribeButton({username,setIsSub} : {username : string,setIsSub : Dispatch<SetStateAction<boolean>>}){
    async function handleSubscribe(){
        setIsSub(false)
        try {
            await server.put('/api/unsubscribe',{username})
        } catch (error) {
            setIsSub(true)
        }
        
    }
    return (
        <Button onClick={handleSubscribe} variant={"destructive"}>
            Unsubscribe
        </Button>
    )
}