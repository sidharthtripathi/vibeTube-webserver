"use client"
import ReactHlsPlayer from "react-hls-player";

export default function VideoPlayer({src,autoPlay,controls,width,className} : {
    src : string,
    controls:boolean,
    autoPlay : boolean,
    width : string,
    className : string,
}){
    return (
        // @ts-ignore
        <ReactHlsPlayer
        src={src}
        controls = {controls}
        autoPlay = {autoPlay}
        width={width}
        className={className}
        
        />
    )
}