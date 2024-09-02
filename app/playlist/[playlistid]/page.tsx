
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { VideoCard } from "@/components/ui/VideoCard"

export default function Component() {
  return (
    <section >
    <Breadcrumb className='px-2'>
         <BreadcrumbList className="text-3xl font-bold">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/playlist">Playlist</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                     <BreadcrumbLink href="/playlist/abc">abc</BreadcrumbLink>
                </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
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

