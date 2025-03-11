"use client"
import { server } from "@/lib/axios"
import { userState } from "@/state/userState"
import { useRouter } from "next/navigation"
import { useSetRecoilState } from "recoil"
export function LogoutButton(){
    const router = useRouter()
    const setUser = useSetRecoilState(userState)
    return(
        <span
        className="p-2 text-sm hover:bg-secondary inline-block w-full rounded-md hover:cursor-pointer"
        onClick={async()=>{
            try {
                await server.post('/api/logout')
                setUser(null)
                router.push('/join')
            } catch (error) {
                
            }
        }}
        >Logout</span>
    )
}