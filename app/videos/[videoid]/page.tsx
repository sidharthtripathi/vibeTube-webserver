import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { VideoSuggestionCard } from "@/components/ui/VideoSuggestionCard";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";

export default async function Video({params} : {params : {videoid:string}}){
    const video = await prisma.video.findUnique({where:{id:params.videoid},select:{
        hlsVideoUrl:true,
        title:true,
        description:true,
        createdAt:true,
        views :true,
        uploader : {
            select : {
                username : true,
                avatar : true,
                subscribersCount : true,
            }
        }
    }})

    const videoSuggestion = await prisma.video.findUnique({
        where:{id : params.videoid},
        select : {
            uploader : {
                select : {
                    videos : {
                        select : {
                            thumbnailUrl : true,
                            title: true,
                            id : true,
                            createdAt : true,
                            views : true,
                        },
                        orderBy : {createdAt:"desc"},
                        take : 5
                    },
                    username : true
                }
            },
        }
    })
    if(!video) return notFound()
    return (
    <div className="flex gap-4 p-4 items-start">
        <div className="lg:basis-2/3">
                {/* @ts-ignore */}
             <VideoPlayer
             
            src={video.hlsVideoUrl}
            autoPlay={false}
            controls={true}
            width="100%"
            className="aspect-video rounded-md"
            />
            {/* <video src={video.hlsVideoUrl}controls className="aspect-video rounded-md w-full"/> */}
            <div className="space-y-2">
                <p className="line-clamp-2 font-bold text-2xl">{video.title}</p>
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                    <Avatar>
                     <AvatarImage src={video.uploader.avatar!} className="rounded-full size-12" />
                         <AvatarFallback>CN</AvatarFallback>
                         </Avatar>
                       
                        <div>
                            <p className="font-semibold">{video.uploader.username}</p>
                            <p className="text-sm text-gray-300">{video.uploader.subscribersCount} Subscribers</p>
                        </div>
                    </div>
                    <Button>Subscribe</Button>
                </div>
            </div>
            <div className="bg-secondary rounded-lg mt-2 p-2">
                <div className="text-sm text-card-foreground space-x-2">
                    <span>{video.views} Views</span>
                    <span>&#8226;</span>
                    <span>{video.createdAt.toISOString()}</span>
                </div>
                <p className="text-sm">
                    {video.description}
                </p>
            </div>
        </div>
        <div className="hidden lg:grid grid-cols-1 gap-4">

             {/* Better create a paralle route for this */}
             {
                videoSuggestion?.uploader.videos.map(video=>(
                    <VideoSuggestionCard title={video.title} thumbnailUrl={video.thumbnailUrl} createdAt={video.createdAt} views={video.views} username={videoSuggestion.uploader.username} key={video.id} />
                ))
             }
        </div>
    </div>
    )
}