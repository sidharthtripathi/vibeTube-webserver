import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
export async function POST(req:NextRequest){
    const {username,password} = await req.json()
    const user = await prisma.user.findUnique({where:{username,password}})
    if(!user) return NextResponse.json("WRONG CREDENTIALS",{status : 401,statusText: "WRONG CREDENTIALS"});
    const token = jwt.sign({username},process.env.JWT_SECRET as string)
    cookies().set("access-token",token,{httpOnly:true,expires : 24*60*60*7})
    return  NextResponse.json({token})
}