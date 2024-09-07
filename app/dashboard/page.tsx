import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pl-2 gap-4">
      <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">update your profile information</p>
          <div>
            <h2 className="text-xl font-semibold">Cover image</h2>
            <div className="space-y-4">
              <Image alt="cover image" width={1000} height={500} src={"/banner.jpg"} className="aspect-video object-cover h-24 rounded-md" />
              <Button>Change conver image</Button>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Avatar</h2>
            <div className="flex items-center gap-4">
              <Image alt="avatar" width={100} height={100} src={'/profile.webp'} className="size-20 rounded-full"/>
              <Button>Change avatar</Button>
            </div>
          </div>
         
          <div className="mt-6">
            <Label htmlFor="username" className=" font-semibold">Username</Label>
            <Input type="text" id="username"/>
            <Label htmlFor="password" className=" font-semibold">Password</Label>
            <Input type="password" id="password"/>
          </div>
          <Button className="mt-4">Save</Button>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Videos</h1>
        <p className="text-sm text-muted-foreground">check your published videos</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Published Videos</h2>
          <Input type="text" placeholder="search videos" className="my-2" />
          <ScrollArea className="h-[50vh]">
            {/* published videos */}
            <div className="flex items-start gap-2 mb-2">
              <Image width={150} height={90} alt="thumbnail" src={"/thumbnail.jpg"} className="rounded-md" />
              <div>
                <p className="font-semibold">Video title here</p>
                <p className="text-sm text-muted-foreground">Published on 12-may-2002</p>
                <div className="space-x-2 mt-1">
                  <Dialog>
                    <DialogTrigger>
                      <span className="text-sm bg-destructive p-2 rounded-md">Delete</span>
                      {/* <Button size={"sm"} variant={"destructive"}>Delete</Button> */}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Video</DialogTitle>
                        <DialogDescription>
                          <p>Do you really want to delete this video ?</p>
                          <p className="underline underline-offset-2">This can not be undone</p>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose className="mr-2">Close</DialogClose>
                        <Button variant={"destructive"}>Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Link href={"/dashboard/videos/someid"}className=" text-sm hover:underline hover:text-muted-foreground">Edit</Link>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}