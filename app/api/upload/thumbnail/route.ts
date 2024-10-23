import { getPutSignedURL } from "@/lib/s3"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
export async function GET(){
    const username = headers().get("username")
    if(!username) return NextResponse.json("ACCESS DENIED",{status : 401,statusText : "ACCESS DENIED"})
    return NextResponse.json(await getPutSignedURL('image/jpeg'))
}