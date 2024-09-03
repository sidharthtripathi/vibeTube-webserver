import { getPutSignedURL } from "@/lib/s3"
import { verifyToken } from "@/lib/verifytoken"
import { NextResponse } from "next/server"
import {v4 as uuid} from 'uuid'
export async function GET(){
    const username = await verifyToken()
    if(username===false) return NextResponse.json("ACCESS DENIED",{status : 401,statusText : "ACCESS DENIED"})
    return NextResponse.json(await getPutSignedURL('image/jpeg'))
}