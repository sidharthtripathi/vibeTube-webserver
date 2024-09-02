
import { VideoCard } from "@/components/ui/VideoCard"

export default function Component(req : {searchParams : Record<string,string>}) {

    const q = req.searchParams.q
  return (
    <section>
        <h2 className="pl-2 text-sm text-muted-foreground">Search Results for <span className="text-xl text-primary font-bold underline">{q}</span></h2>
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

