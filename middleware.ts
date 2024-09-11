import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest){
    const accessToken = cookies().get('access-token')
    const requestHeaders = new Headers(req.headers);
    if(!accessToken) return NextResponse.redirect(new URL("/join",req.url))
    else{

        try {
            const {username} = jwt.verify(accessToken.value,process.env.JWT_SECRET as string) as JwtPayload
            requestHeaders.set('username',username)
        } catch (error) {
            return NextResponse.redirect(new URL("/join",req.url))
        }
        finally{
            return NextResponse.next({
                request : {
                    headers : requestHeaders
                }
            })
        }
    }
}

export const config = {
    matcher : ['/subscriptions','/playlist/:path','/upload','/dashboard']
}