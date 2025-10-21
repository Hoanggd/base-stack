import { PROJECT_NAME } from '@/shared/consts/common'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'

interface LogoProps {
    className?: string
    textClassName?: string
    withName?: boolean
}

export function Logo({ className, textClassName, withName = true }: LogoProps) {
    return (
        <Link href="/" className={cn('flex-shrink-0 flex items-center gap-2 w-fit', className)}>
            <img src="/logo.png" alt="Logo" className="w-7 h-7" />
            {withName && (
                <span className={cn('font-semibold text-md text-foreground', textClassName)}>{PROJECT_NAME}</span>
            )}
        </Link>
    )
}
