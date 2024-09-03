import { prisma } from "@/lib/prisma"
import { getPutSignedURL } from "@/lib/s3"
import { verifyToken } from "@/lib/verifytoken"
import { NextRequest, NextResponse } from "next/server"

async function presignedURL(){
    const username = await verifyToken()
    if(username===false) return NextResponse.json("ACCESS DENIED",{status : 401,statusText : "ACCESS DENIED"})
    return NextResponse.json(await getPutSignedURL())
}

export async function POST(req : NextRequest){
    const username = await verifyToken()
    if(username===false) return NextResponse.json("ACCESS DENIED",{status : 401,statusText : "ACCESS DENIED"})
    const {title,description,url} = await req.json()
    const video = await prisma.video.create({
        data : {title,description,url,uploader:{connect : {username}}}
    })
    return NextResponse.json(video)
}

export {presignedURL as GET}