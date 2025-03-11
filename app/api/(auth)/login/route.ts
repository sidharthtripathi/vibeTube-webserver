import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { loginSchema } from "@/schema/authSchema";
export async function POST(req:NextRequest){
    try {
        const {username,password} = loginSchema.parse(await req.json())
        const user = await prisma.user.findUnique({where:{username,password},select : {id:true}})
        if(!user) return NextResponse.json("WRONG CREDENTIALS",{status : 401,statusText: "WRONG CREDENTIALS"});
        const token = await new SignJWT({username,id: user.id}).setProtectedHeader({alg : "HS256"}).sign(new TextEncoder().encode(process.env.JWT_SECRET as string))
        cookies().set("access-token",token,{httpOnly:true,expires : Date.now() + 24*60*60*7*1000})
        return  NextResponse.json({id:user.id,username})
    } catch (error) {
        return NextResponse.json({},{status : 400})
    }
}