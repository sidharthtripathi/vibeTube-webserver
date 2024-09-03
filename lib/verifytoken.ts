import { cookies } from "next/headers";
import jwt, { JwtPayload } from 'jsonwebtoken'
export async function verifyToken(){
    const token = cookies().get('access-token')
    if(!token) return false
    try {
        const {username} =  jwt.verify(token.value,process.env.JWT_SECRET as string) as JwtPayload
        return username as string
    } catch (error) {
        return  false
    }
}