"use server"

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function addComment(videoId:string,comment:string) {
    const userId = headers().get("id")
    if(!userId) throw new Error("unauthenticated")
    
    try {
        const {id} = await prisma.comment.create({
            data : {comment,videoId,authorId:userId},
            select : {id:true}
        })
        return {id}
    } catch (error) {
        throw new Error("something went wrong")
    }
  }

export async function addReply(reply:string,commentId : string){
    const userId = headers().get("id")
    if(!userId) throw new Error("unauthenticated")

    try {
        const res = await prisma.$transaction([
            prisma.comment.create({
                data :{comment:reply,authorId:userId,commentId},
                select : {id:true},
            }),
            prisma.comment.update({
                data : {replyCount : {increment : 1}},
                where : {id:commentId},
                select : {id:true}
            })
        ])
        if(res[0].id) return res[0].id
        else throw new Error("something went wrong")
        
    } catch (error) {
        throw new Error("something went wrong")
    }
}


export async function getReplies(commentId : string){

    try {
        const res = await prisma.comment.findUnique({
            where : {id:commentId},
            select : {replies : {select : {id:true,author : {select : {username:true,avatar:true}},comment:true,createdAt:true,replyCount:true}}}
        })
        if(!res) throw new Error("invalid commentID")
        else return res.replies
    } catch (error) {
        throw new Error("something went wrong")
    }
}