import Image from "next/image";
import Link from "next/link";

export function VideoCard(){
    return (
        <div className="p-2">
        <div className="relative">
          <Image
            src="/thumbnail.jpg"
            alt="Thumbnail"
            width={320}
            height={180}
            className="aspect-video rounded-md w-full"
          />
          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded-md">12:34</div>
        </div>
        <div className="mt-2 flex items-start gap-4">
        <Image src={"/profile.webp"} width={28} height={28} alt="profile" className="rounded-full size-10 object-cover"/>
          <div >
          <div className="font-medium line-clamp-2">Introducing v0: Generative UI</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="line-clamp-1">Vercel</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="line-clamp-1">300K views</div>
            <div className="line-clamp-1">5 days ago</div>
          </div>
          </div>
         
        </div>
      </div>
    )
}