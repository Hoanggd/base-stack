import { Loader2Icon } from 'lucide-react'

import { cn } from '@workspace/ui/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <Loader2Icon role="status" aria-label="Loading" className={cn('animate-spin', className)} {...props} />
    )
}

export { Spinner }
