"use client"
import Hls from 'hls.js'

import { useEffect, useRef } from 'react'
export default function VideoPlayer({src,autoPlay,controls,width,className} : {
    src : string,
    controls:boolean,
    autoPlay : boolean,
    width : string,
    className : string,
}){
    const videoRef = useRef<null | HTMLVideoElement>(null)
    useEffect(()=>{
      const hls = new Hls()
        if(Hls.isSupported() && videoRef.current){
          hls.loadSource(src)
          hls.attachMedia(videoRef.current)
        }
      })
    return (
        <video
        ref={videoRef}
        width={"100%"}
        controls
        autoPlay
        className={className}
        
        />
    )
}