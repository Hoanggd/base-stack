import { cn } from '@workspace/ui/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return <div data-slot="skeleton" className={cn('bg-neutral-400/20 animate-pulse rounded', className)} {...props} />
}

export { Skeleton }
