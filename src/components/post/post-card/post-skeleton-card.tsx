import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="bg-foreground/30 p-4 rounded-md shadow-md flex flex-col items-center text-center">
            <Skeleton className="w-full h-32 rounded-lg mb-4" />
            <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full mx-auto" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
            </div>
        </div>
    );
}