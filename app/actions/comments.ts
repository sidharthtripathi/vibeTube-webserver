"use server"

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function addComment(videoId:string,comment:string) {
    const userId = headers().get("id")
    if(!userId) throw new Error("unauthenticated")
    
    try {
        const res = await prisma.comment.create({
            data : {comment,videoId,authorId:userId},
            select : {id:true}
        })
        return {id:res.id}
    } catch (error) {
        throw new Error("something went wrong")
    }
  }

export async function addReply(formData : FormData){
    const username = headers().get("username")
    if(!username) throw new Error("unauthenticated")
    const comment = formData.get("comment");
    const commentId = formData.get("commentId")
    try {
        // set the reply
    } catch (error) {
        
    }
    return {comment : "Here is the comment"}
}