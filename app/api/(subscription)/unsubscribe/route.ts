import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {
    const username = headers().get("username")
    if(!username) return NextResponse.json("INVALID ACCESS TOKEN",{status : 401,statusText : "INVALID ACCESS TOKEN"});
    const {username: channelName} = await req.json();
    await prisma.user.update({
        where : {username : channelName},
        data : {subscribers : {disconnect : {username}},subscribersCount : {decrement : 1}}
    })
    return NextResponse.json("SUCCESS",{status : 201})
    
}