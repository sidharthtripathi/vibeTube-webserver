import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/ui/VideoCard";
import Image from "next/image";

export default function Channel(){
    return(
        <div className="container px-2 sm:px-0">
            <header className="space-y-4">
                <Image alt="banner image" src = '/banner.jpg' width={30} height={30} sizes="100vw" className="rounded-md w-full sm:aspect-[1/0.15] aspect-[1/0.3] object-cover"/>
                <div className="flex items-center gap-4">
                    <Image alt="profile" src="/profile.webp" width={300} height={300} className="rounded-full sm:size-44 size-36 object-cover" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold">MailTrap</h1>
                        <div className="space-x-2 text-sm text-secondary-foreground/80">
                            <span>@mailtrap</span>
                            <span>&#8226;</span>
                            <span>130k subscribers</span>
                            <span>&#8226;</span>
                            <span>231 videos</span>
                        </div>
                        <p className="text-sm bg-secondary rounded-md p-2 line-clamp-4 max-w-fit">Here is all about the channel dude just have a look at meh </p>
                        <Button>Subscribe</Button>
                    </div>
                </div>
            </header>
            <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
            </section>
        </div>
    )
}