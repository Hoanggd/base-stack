import { Skeleton } from '@workspace/ui/components/Skeleton'

export function SkeletonScreen() {
    return (
        <div className="w-full">
            <div className="space-y-3 mb-8">
                <Skeleton className="h-7 w-5/12" />
                <Skeleton className="h-7 w-7/12" />
            </div>
            <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-9/12" />
            </div>
            <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-8/12" />
            </div>
        </div>
    )
}
