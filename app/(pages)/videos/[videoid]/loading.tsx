import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(){
    const tempArr = [1,1]
    return (
        <div className="flex gap-4">
            <div className="w-full md:w-2/3">
            <Skeleton className="aspect-video"/>
            <div className="flex justify-between mt-4 gap-4">
                <Skeleton className="rounded-full size-12"/>
                <div className="grow space-y-2">
                    <Skeleton className="h-7 w-full"/>
                    <Skeleton className="h-12 w-full"/>
                </div>
            </div>
            </div>
            <div className="grow space-y-3">
                {
                    tempArr.map((_,index)=>(
                        <Skeleton key={index} className="w-full h-52"/>
                    ))
                }
            </div>
            

        </div>
    )
}