import { prisma } from "@/lib/prisma";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const username = headers().get("username")
    if(!username) return NextResponse.json("NO ACCESS TOKEN",{status : 401})
    return NextResponse.json(await prisma.playlist.findMany({where : {creator : {username}},select : {id:true,name:true}}))
}

export async function PUT(req:NextRequest){
    const username = headers().get("username")
    if(!username) return NextResponse.json("NO ACCESS TOKEN",{status : 401})
    const {videoId,playlistId} = await req.json();
    await prisma.playlist.update({
        where : {id:playlistId,creator : {username}},
        data : {
            videos : {connect : {id : videoId}}
        }
    })
    return NextResponse.json("OK")

}

export async function POST(req : NextRequest) {
    const username = headers().get("username")
    if(!username) return NextResponse.json("UNAUTHENTICATED",{status : 401,statusText : "unauthenticated"})
    const {title} = await req.json()
    await prisma.playlist.create({
        data : {name : title,creator : {connect : {username}}}
    })
    return NextResponse.json("CREATED",{status : 201})
}