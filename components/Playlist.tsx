"use client"

import { server } from "@/lib/axios"
import { useEffect, useState } from "react"

export function Playlist({videoId} : {videoId : string}){
    const [playlists,setPlaylist] = useState<{name:string,id:string}[]>([])

    useEffect(()=>{
        async function get(){
            const {data} = await server.get('/playlist')
            setPlaylist(data)
        }
        get()
        
    },[])
    return(
        <ul className="space-y-2">
            {playlists.map(playlist=>(
                <li key={playlist.id} className="bg-secondary rounded-md p-2"
                onClick={async()=>{
                    server.put("/playlist",{videoId,playlistId : playlist.id})
                }}
                >{playlist.name}</li>
            ))}
        </ul>
    )
}