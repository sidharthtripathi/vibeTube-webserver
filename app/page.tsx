
import { VideoCard } from "@/components/ui/VideoCard"
import { prisma } from "@/lib/prisma"
import Head from 'next/head'
export default async function Component() {
  const videos = await prisma.video.findMany({
    orderBy : {createdAt : "desc"},
    take : 50,
    select : {
      thumbnailUrl : true,
      id:true,
      title : true,
      views : true,
      createdAt : true,
      uploader : {
        select : {username : true,avatar : true}
      }
    }

  })
  // console.log(videos)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" >
      <Head>
        <title>some name here</title>
      </Head>
      {
        videos.map(video=>(<VideoCard id={video.id} key={video.id} thumbnailUrl={video.thumbnailUrl} avatar={video.uploader.avatar!} username={video.uploader.username} createdAt={video.createdAt}title={video.title} views={video.views} />))
      }
    </div>
  )
}

