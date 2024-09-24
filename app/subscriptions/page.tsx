
import { VideoCard } from "@/components/ui/VideoCard"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import {redirect} from 'next/navigation'
export default async function Component() {
  const username = headers().get("username")
  console.log("username is :",username)
  if(!username) return redirect('/join')
  const videos = await prisma.user.findUnique({
    where : {
      username
    },
    select : {
      subscribedTo : {
        select : {
          videos : {
            select : {
              thumbnailUrl : true,
              title : true,
              views : true,
              createdAt : true,
              id: true,
              uploader : {
                select : {
                  username : true,
                  avatar : true,
                }
              }
            }
          }
        }
      }
    }
  })
  return (
   <section>
    <h2 className="font-bold text-3xl text-muted-foreground hover:text-primary transition-colors cursor-pointer pl-2 underline underline-offset-2">Subscriptions</h2>
     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" >
      {
        videos?.subscribedTo.map(arr=>{
          return arr.videos.map(video=>(<VideoCard key={video.id} thumbnailUrl={video.thumbnailUrl} username={video.uploader.username} avatar={video.uploader.avatar} createdAt={video.createdAt} id={video.id} title={video.title} views={video.views}/>))
        }).flatMap(arr=>arr)
      }
    </div>
   </section>
  )
}

