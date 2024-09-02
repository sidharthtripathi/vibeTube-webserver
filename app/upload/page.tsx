"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"

export default function Upload(){
    const [file,setFile] = useState<undefined | File>(undefined)
    const [vidSrc,setVidSrc] = useState<undefined | string>()
    return (
        <div className="space-y-2 w-1/2">
            <Input type="file" accept=".mp4" onChange={(e)=>{
                setFile(e.target.files?.[0])
                setVidSrc(URL.createObjectURL(e.target.files?.[0] as File))
            }} />
            {file? <video src={vidSrc} controls className="aspect-video w-full rounded-md"/> : undefined}
            <div className="space-y-2">
                <Input type="text" placeholder="video title"/>
                <Input type="text" placeholder="vidoe description"/>
            </div>
            
            <Button>publish</Button>
        </div>
    )
}