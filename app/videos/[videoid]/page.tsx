import { Button } from "@/components/ui/button";
import { VideoSuggestionCard } from "@/components/ui/VideoSuggestionCard";
import Image from "next/image";

export default function Video(){
    return (
    <div className="flex gap-4 p-4 items-start">
        <div className="basis-2/3">
            <video src="/vid.mp4" controls className="aspect-video rounded-md w-full"/>
            <div className="space-y-2">
                <p className="line-clamp-2 font-bold text-2xl">This is the main video  title</p>
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                        <Image src = '/profile.webp' alt="profile" height={30} width={30} className="rounded-full size-12"/>
                        <div>
                            <p className="font-semibold">Vercel</p>
                            <p className="text-sm text-gray-300">400K Subscribers</p>
                        </div>
                    </div>
                    <Button>Subscribe</Button>
                </div>
            </div>
            <div className="bg-secondary rounded-lg mt-2 p-2">
                <div className="text-sm text-card-foreground space-x-2">
                    <span>140k Views</span>
                    <span>&#8226;</span>
                    <span>10 Minutes ago</span>
                </div>
                <p className="text-sm">
                    Here comes the all of the description of the video and what it is all about man
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
            <VideoSuggestionCard/>
            <VideoSuggestionCard/>
            <VideoSuggestionCard/>
            <VideoSuggestionCard/>
            <VideoSuggestionCard/>
            <VideoSuggestionCard/>
            <VideoSuggestionCard/>
            <VideoSuggestionCard/>
            
        </div>
    </div>
    )
}