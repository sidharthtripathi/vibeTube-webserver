import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
export function ProtectedPage({children} : {children : ReactNode}){
    const username = headers().get("username")
    if(!username) redirect("/join")
    return(
        <div>
            {children}
        </div>
    )
}