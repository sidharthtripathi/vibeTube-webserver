import Image from "next/image";
import Link from "next/link";

export function VideoSuggestionCard({thumbnailUrl,title,views,createdAt,username} : {thumbnailUrl:string,title:string,views:number,createdAt:Date,username:string}){
    return (
        <div className="flex items-start gap-2">
            <Image src = {thumbnailUrl} alt="thumbnail" width={180} height={100} className="aspect-video rounded-md" />
            <div className="flex flex-col justify-between space-y-1">
                <Link href="/videos/abc" className="font-semibold text-xl">{title}</Link>
                <Link href={"/channels/abc"}>{username}</Link>
                <div className="text-sm text-gray-300 space-x-1">
                    <span>{views} Views</span>
                    <span>&#8226;</span>
                    <span>{createdAt.toISOString()}</span>
                </div>
            </div>
        </div>
    )
}