import { cn } from '@workspace/ui/lib/utils'
import { Loader2Icon } from 'lucide-react'

interface SpinnerProps {
    className?: string
}

export function Spinner({ className }: SpinnerProps) {
    return (
        <div role="status">
            <Loader2Icon className={cn('animate-spin', className)} />
            <span className="sr-only">Loading...</span>
        </div>
    )
}
