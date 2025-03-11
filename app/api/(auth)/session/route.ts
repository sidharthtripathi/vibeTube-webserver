import { headers } from "next/headers";
import { NextResponse } from "next/server";

export function GET(){
    const id = headers().get("id")
    const username = headers().get("username")
    const user = id&&username ? {id,username} : null
    if(!user) return NextResponse.json({id,username},{status : 401})
    else return NextResponse.json({id,username})
}