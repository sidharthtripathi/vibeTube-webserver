import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {username,password} = await req.json()
    try {
        await prisma.user.create({
            data : {username,password}
        })
        return NextResponse.json("CREATED",{status : 201,statusText : "CREATED"})
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError) return NextResponse.json({msg : 'INVALID REQUEST'},{status : 400, statusText : "INVALID REQUEST"})
        else return  NextResponse.json({msg : "INTERNAL SERVER ERROR"},{status : 500})
    }

}