import { VideoCard } from "@/components/ui/VideoCard";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SubscriptionButton } from "@/components/SubscriptionButton";

export default async function Channel({params : {channelid}} : {params : {channelid : string}}){
    const creator = await prisma.user.findUnique({
        where : {username : channelid},
        select : {
            avatar : true,
            converImage : true,
            username : true,
            subscribersCount : true,
            videosPublishedCount : true,
            videos : {
                select : {
                    thumbnailUrl : true,
                    id : true,
                    title : true,
                    views : true,
                    createdAt : true,
                }
            }

        }
    })
    if(!creator) return notFound()
    return(
        <div className="container px-2 sm:px-0">
            <header className="space-y-4">
                <Image alt="banner image" src = {creator.converImage!} width={30} height={30} sizes="100vw" className="rounded-md w-full sm:aspect-[1/0.15] aspect-[1/0.3] object-cover"/>
                <div className="flex items-center gap-4">
                <Avatar className="size-36 sm:size-44">
  <AvatarImage src={creator.avatar!} className="rounded-full sm:size-44 size-36 object-cover" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold">{creator.username}</h1>
                        <div className="space-x-2 text-sm text-secondary-foreground/80">
                            <span>@{creator.username}</span>
                            <span>&#8226;</span>
                            <span>{creator.subscribersCount} subscribers</span>
                            <span>&#8226;</span>
                            <span>{creator.videosPublishedCount} videos</span>
                        </div>
                        <p className="text-sm bg-secondary rounded-md p-2 line-clamp-4 max-w-fit">Here is all about the channel dude just have a look at meh </p>
                        <SubscriptionButton username={creator.username}/>
                    </div>
                </div>
            </header>
            <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
              {
                creator.videos.map(({id,thumbnailUrl,title,views,createdAt})=>(
                    <VideoCard key={id} id={id} thumbnailUrl={thumbnailUrl} title={title} views={views} createdAt={createdAt} avatar={creator.avatar!} username={creator.username} />
                ))
              }
            </section>
        </div>
    )
}