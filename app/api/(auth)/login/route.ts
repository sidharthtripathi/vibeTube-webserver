import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { loginSchema } from "@/schema/authSchema";
export async function POST(req:NextRequest){
    try {
        const {username,password} = loginSchema.parse(await req.json())
        const user = await prisma.user.findUnique({where:{username,password}})
        if(!user) return NextResponse.json("WRONG CREDENTIALS",{status : 401,statusText: "WRONG CREDENTIALS"});
        const token = await new SignJWT({username}).setProtectedHeader({alg : "HS256"}).sign(new TextEncoder().encode(process.env.JWT_SECRET as string))
        cookies().set("access-token",token,{httpOnly:true,expires : Date.now() + 24*60*60*7*1000})
        return  NextResponse.json({token})
    } catch (error) {
        return NextResponse.json({},{status : 400})
    }
}