import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/verifytoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const username = await verifyToken();
    if(!username) return NextResponse.json("NO ACCESS TOKEN",{status : 401})
    return NextResponse.json(await prisma.playlist.findMany({where : {creator : {username}},select : {id:true,name:true}}))
}

export async function PUT(req:NextRequest){
    const username = await verifyToken();
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