import { NextRequest, NextResponse } from 'next/server';
import {jwtVerify} from 'jose'

export async function middleware(request: NextRequest) {
  request.headers.delete("username")
  request.headers.delete("id")
  const token = request.cookies.get('access-token');

  if (!token) return NextResponse.next();
  const requestHeaders = new Headers(request.headers);
  try {
    const {payload} = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET as string))
    requestHeaders.set('username', payload.username as string);
    requestHeaders.set('id', payload.id as string);
  } catch (error) {
    console.log(error);
  } finally {
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }
}

export const config = {
  matcher: ['/api/:path+','/channels/:path*','/playlist/:path*','/subscriptions/:path*','/upload/:path*','/videos/:path*','/']
}