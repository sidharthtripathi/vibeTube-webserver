
import { VideoCard } from "@/components/ui/VideoCard"

export default function Component() {
  return (
   <section>
    <h2 className="font-bold text-3xl text-muted-foreground hover:text-primary transition-colors cursor-pointer pl-2 underline underline-offset-2">Subscriptions</h2>
     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" >
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
     <VideoCard/>
    </div>
   </section>
  )
}

