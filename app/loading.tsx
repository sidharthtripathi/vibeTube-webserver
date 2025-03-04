import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(){
    const arr = [1,2,3,4,5,6];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                arr.map((i)=>(
                    <Skeleton key={i} className="aspect-video h-56" />
                ))
            }
        </div>
    )
}