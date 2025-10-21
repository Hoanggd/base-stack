import { Skeleton } from '@workspace/ui/components/Skeleton'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard Preview',
    description: 'A page preview for the dashboard layout, demonstrating loading states and UI skeletons.',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <div>
            <h1 className="capitalize text-2xl font-semibold mb-5">{id}</h1>
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
        </div>
    )
}
