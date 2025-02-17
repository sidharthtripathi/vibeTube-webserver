import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {
    const loggedinUser = headers().get("username")
    if(!loggedinUser) return NextResponse.json("INVALID ACCESS TOKEN",{status : 401,statusText : "INVALID ACCESS TOKEN"});
    const {username} = await req.json();
    await prisma.user.update({
        where : {username : username},
        data : {subscribers : {connect : {username : loggedinUser}},subscribersCount : {increment : 1}}
    })
    return NextResponse.json("SUCCESS",{status : 201}) 
}

export async function GET() {
    const loggedinUser = headers().get("username")
    if(!loggedinUser) return NextResponse.json("INVALID ACCESS TOKEN",{status : 401,statusText : "INVALID ACCESS TOKEN"});
    return NextResponse.json(await prisma.user.findUnique({where : {username : loggedinUser},select : {
        subscribedTo : {
            select : {username : true}
        }
    }}))
}