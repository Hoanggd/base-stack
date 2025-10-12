import { Slot, Slottable } from '@radix-ui/react-slot'
import { Spinner } from '@workspace/ui/components/Spinner'
import { cn } from '@workspace/ui/lib/utils'

export interface LoadingOverlayProps {
    children: React.ReactNode
    isLoading?: boolean
}

export function LoadingOverlay({ children, isLoading }: LoadingOverlayProps) {
    return (
        <Slot className={cn('relative', isLoading && 'opacity-60')}>
            <Slottable>{children}</Slottable>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner className="size-7 text-primary" />
                </div>
            )}
        </Slot>
    )
}
