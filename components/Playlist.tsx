"use client"

import { server } from "@/lib/axios"
import { useEffect, useState } from "react"
import { DialogClose, DialogFooter } from "./ui/dialog"

export function Playlist({videoId} : {videoId : string}){
    const [playlists,setPlaylist] = useState<{name:string,id:string}[]>([])

    useEffect(()=>{
        async function get(){
            const {data} = await server.get('/api/playlist')
            console.log(data)
            setPlaylist(data)
        }
        get()
    },[])
    return(
        <DialogFooter className="space-y-2">
            {playlists.map(playlist=>(
                <DialogClose key={playlist.id} className="bg-secondary rounded-md w-full p-2 cursor-pointer"
                onClick={async()=>{
                    server.put("/api/playlist",{videoId,playlistId : playlist.id})
                }}
                >{playlist.name}</DialogClose>
            ))}
        </DialogFooter>
    )
}