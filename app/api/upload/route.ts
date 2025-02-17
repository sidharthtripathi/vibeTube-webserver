import { prisma } from "@/lib/prisma"
import { sendToQueue } from "@/lib/rabbitmq"
import { getPutSignedURL } from "@/lib/s3"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
async function presignedURL(){
    const username = headers().get("username")
    if(!username) return NextResponse.json("ACCESS DENIED",{status : 401,statusText : "ACCESS DENIED"})
    return NextResponse.json(await getPutSignedURL("video/mp4"))
}

type UploadResponse = {
    title : string,
    description : string,
    rawVideoUrl : string,
    hlsVideoUrl : string,
    thumbnailUrl : string,
    id: string
}
export async function POST(req : NextRequest){
    const username = headers().get("username")
    if(!username) return NextResponse.json("ACCESS DENIED",{status : 401,statusText : "ACCESS DENIED"})
    const {title,description,rawVideoUrl,hlsVideoUrl,thumbnailUrl,id} = (await req.json()) as UploadResponse
    const video = await prisma.video.create({
        data : {id,title,description,thumbnailUrl,rawVideoUrl,hlsVideoUrl,uploader:{connect : {username}}}
    })
    await sendToQueue({rawVideoUrl,id})
    return NextResponse.json(video)
}

export {presignedURL as GET}