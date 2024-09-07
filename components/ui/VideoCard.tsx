import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { timeAgo } from "@/lib/time";

export function VideoCard({thumbnailUrl,title,username,avatar,views,createdAt,id} : {thumbnailUrl:string,title:string,views:number,createdAt:Date,username:string,avatar:string,id:string}){
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
          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded-md">12:34</div>
        </div>
        <div className="mt-2 flex items-start gap-4">

        {/* <Image src={avatar} width={28} height={28} alt="profile" className="rounded-full size-10 object-cover"/> */}
            <Avatar>
              <AvatarImage src={avatar} className="rounded-full size-10 object-cover" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

          <div >
          <Link href={`videos/${id}`} className="font-medium line-clamp-2">{title}</Link>
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