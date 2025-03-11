"use client";
import { userState } from "@/state/userState";
import { useRecoilState } from "recoil";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

import { useEffect } from "react";
import { server } from "@/lib/axios";
export function UserDropdown() {
  const [user,setUser] = useRecoilState(userState);
  useEffect(()=>{
    async function getSession(){
        try {
            const {data} = await server.get('/api/session')
            setUser({id:data.id,username:data.username})
        } catch (error) {
            setUser(null)
        }
    }
    getSession()
  },[])
  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-8">
            <AvatarFallback>
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={"/upload"}>upload</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <LogoutButton/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return (
    <Link
      href="/join"
      className="text-sm font-medium hover:underline underline-offset-4"
      prefetch={false}
    >
      join
    </Link>
  );
}
