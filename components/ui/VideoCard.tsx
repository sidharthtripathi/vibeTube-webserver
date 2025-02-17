import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { timeAgo } from "@/lib/time";
import format from 'format-duration'
export function VideoCard({thumbnailUrl,title,username,avatar,views,createdAt,id,duration} : {duration : number,thumbnailUrl:string,title:string,views:number,createdAt:Date,username:string,avatar:string |null,id:string}){
    return (
        <div className="p-2">
        <div className="relative">
          <Image
            src={thumbnailUrl}
            alt="Thumbnail"
            width={320}
            height={180}
            className="aspect-video rounded-md w-full"
          />
          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded-md">{format(duration*1000)}</div>
        </div>
        <div className="mt-2 flex items-start gap-4">
            <Avatar>
              <AvatarImage src={avatar!} className="rounded-full size-10 object-cover" />
              <AvatarFallback>{username.slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>

          <div >
          <Link href={`/videos/${id}`} className="font-medium line-clamp-2">{title}</Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={`/channels/${username}`} className="line-clamp-1">{username}</Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="line-clamp-1">{views} views</div>
            <div className="line-clamp-1">{timeAgo.format(createdAt)}</div>
          </div>
          </div>
         
        </div>
      </div>
    )
}