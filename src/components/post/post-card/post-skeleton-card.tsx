import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex gap-4 p-4 bg-accent rounded-lg shadow-md">
            <Skeleton className="w-32 h-24 rounded-md" />
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-4 w-1/3 mt-2" />
            </div>
        </div>
    );
}
