import { PROJECT_NAME } from '@/shared/consts/common'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'

export function Logo({ className, withName = true }: { className?: string; withName?: boolean }) {
    return (
        <Link href="/" className={cn('flex-shrink-0 flex items-center gap-2 w-fit', className)}>
            <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            {withName && <span className="font-semibold text-lg">{PROJECT_NAME}</span>}
        </Link>
    )
}
