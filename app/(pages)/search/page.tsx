
import { VideoCard } from "@/components/ui/VideoCard"
import { prisma } from "@/lib/prisma"
export default async function Search(req : {searchParams : Record<string,string>}) {
  
    const q = req.searchParams.q
    const videos = await prisma.video.findMany({
      where : {OR : [{title : {contains : q}},{description : {contains : q}}]},
      select : {
        thumbnailUrl : true,
        duration : true,
        title : true,
        views : true,
        createdAt : true,
        id : true,
        uploader : {
          select : {
            username : true,
            avatar : true,
          }
        }
      }
    })
  return (
    <section>
        <h2 className="pl-2 text-sm text-muted-foreground">Search Results for <span className="text-xl text-primary font-bold underline">{q}</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" >
     {
      videos.map(({id,thumbnailUrl,duration,title,uploader,views,createdAt})=>(
        <VideoCard duration={duration} key={id} id={id} thumbnailUrl={thumbnailUrl} title={title} username={uploader.username} avatar={uploader.avatar} views={views} createdAt={createdAt}  />
      ))
     }
    </div>
    </section>
 
  )
}

