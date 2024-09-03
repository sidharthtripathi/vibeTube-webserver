"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { server } from "@/lib/axios"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {Progress} from '@/components/ui/progress'


export default function Upload(){
    const router = useRouter()
    const [file,setFile] = useState<undefined | File>(undefined)
    const [vidSrc,setVidSrc] = useState<undefined | string>()
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [loading,setLoading] = useState(false)
    const [progress,setProgress] = useState(0)
    async function handlePublish(){
        setLoading(true)
        // getting presigned url
        const {preSignedUrl,uploadedAt} = (await server.get('/api/upload')).data
        // upload video file to the presigned url
        await axios.put(preSignedUrl,file,{
            onUploadProgress : (e)=>{
                if (e.lengthComputable){
                    const progress = Math.round((e.loaded / e.total!) * 100);
                    setProgress(progress)
                }
                
            }
        })
        // update video in DB
        await server.post('/api/upload',{title,description,url:uploadedAt})
        setLoading(false)
        setTitle("")
        setDescription("")
        setFile(undefined)
        setVidSrc(undefined)
        toast({title : "SUCEESS",description : "Video published"})
    }
    return (
        <div className="space-y-2 w-1/2">
            <Input type="file" accept=".mp4" onChange={(e)=>{
                setFile(e.target.files?.[0])
                setVidSrc(URL.createObjectURL(e.target.files?.[0] as File))
                
            }} />
            {file? <video src={vidSrc} controls className="aspect-video w-full rounded-md"/> : undefined}
            <div className="space-y-2">
                <Input disabled = {loading} value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="video title"/>
                <Input disabled = {loading}  type="text" value={description} onChange={e=>{setDescription(e.target.value)}} placeholder="vidoe description"/>
            </div>
            
            <Button onClick={handlePublish} disabled = {file==undefined || title==='' || description === '' || loading}>publish</Button>
            {!loading? undefined : <Progress value = {progress}/>}
        </div>
    )
}