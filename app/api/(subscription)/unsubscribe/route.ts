import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {
    const loggedinUser = headers().get("username")
    if(!loggedinUser) return NextResponse.json("INVALID ACCESS TOKEN",{status : 401,statusText : "INVALID ACCESS TOKEN"});
    const {username} = await req.json();
    await prisma.user.update({
        where : {username},
        data : {subscribers : {disconnect : {username : loggedinUser}},subscribersCount : {decrement : 1}}
    })
    return NextResponse.json("SUCCESS",{status : 201})
    
}