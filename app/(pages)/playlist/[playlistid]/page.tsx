import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { VideoCard } from "@/components/ui/VideoCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Component({
  params: { playlistid },
}: {
  params: { playlistid: string };
}) {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistid },
    select: {
      name: true,
      videos: {
        where : {isPublished : true},
        select: {
          thumbnailUrl: true,
          duration : true,
          title: true,
          createdAt: true,
          id: true,
          views: true,
          uploader: {
            select: { username: true, avatar: true },
          },
        },
      },
    },
  });
  if(!playlist) return notFound()
  return (
    <section>
      <Breadcrumb className="px-2">
        <BreadcrumbList className="text-3xl font-bold">
          <BreadcrumbItem>
            <Link href="/playlist">Playlist</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/playlist/${playlistid}`}>
              {playlist.name}
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlist.videos.map((video) => (
          <VideoCard
          duration={video.duration}
            key={video.id}
            id={video.id}
            avatar={video.uploader.avatar}
            createdAt={video.createdAt}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            username={video.uploader.username}
            views={video.views}
          />
        ))}
      </div>
    </section>
  );
}
