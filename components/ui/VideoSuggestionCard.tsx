import Image from "next/image";
import Link from "next/link";

export function VideoSuggestionCard(){
    return (
        <div className="flex items-start gap-2">
            <Image src = "/thumbnail.jpg" alt="thumbnail" width={180} height={100} className="aspect-video rounded-md" />
            <div className="flex flex-col justify-between space-y-1">
                <p className="font-semibold text-xl">This is the video title</p>
                <Link href={"#"}>channel</Link>
                <div className="text-sm text-gray-300 space-x-1">
                    <span>130k Views</span>
                    <span>&#8226;</span>
                    <span>5 Minutes Ago</span>
                </div>
            </div>
        </div>
    )
}