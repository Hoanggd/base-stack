'use client'

import { Button } from '@workspace/ui/components/Button'
import { AlertTriangleIcon, CircleCheckIcon, CircleXIcon, InfoIcon, XIcon } from 'lucide-react'
import { toast as sonnerToast, Toaster, ToastT } from 'sonner'

interface ToastProps {
    id: string | number
    title: string
    description?: React.ReactNode
    variant?: 'success' | 'error' | 'info' | 'warning' | 'neutral'
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
    const { title, description, id, variant = 'neutral' } = props

    return (
        <div className="group relative flex items-center gap-3 rounded-xl bg-popover shadow-popover border w-full md:w-[364px] py-2.5 px-4 pr-7 min-h-[64px]">
            <ToastIcon variant={variant} />
            <div className="flex flex-1 items-center">
                <div className="w-full">
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    {description && <div className="mt-0.5 text-sm text-muted-foreground">{description}</div>}
                </div>
            </div>
            <Button
                size="iconSm"
                variant="ghost"
                onClick={() => sonnerToast.dismiss(id)}
                className="absolute right-1.5 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <XIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
        </div>
    )
}

function ToastIcon({ variant }: { variant: ToastProps['variant'] }) {
    if (variant === 'neutral') {
        return null
    }

    return (
        <>
            {variant === 'success' && <CircleCheckIcon className="size-5 text-green-500 dark:text-green-400" />}
            {variant === 'error' && <CircleXIcon className="size-5 text-destructive-foreground" />}
            {variant === 'info' && <InfoIcon className="size-5 text-blue-500 dark:text-blue-400" />}
            {variant === 'warning' && <AlertTriangleIcon className="size-5 text-yellow-500 dark:text-yellow-400" />}
        </>
    )
}

function createToast(variant: ToastProps['variant']) {
    return (props: Omit<ToastProps, 'id' | 'variant'>, options: Pick<ToastT, 'position' | 'duration'> = {}) => {
        return sonnerToast.custom(id => <Toast id={id} variant={variant} {...props} />, {
            position: 'top-right',
            ...options,
        })
    }
}

const success = createToast('success')
const error = createToast('error')
const info = createToast('info')
const warning = createToast('warning')
const neutral = createToast('neutral')

const toast = {
    success,
    error,
    info,
    warning,
    neutral,
}

export { toast, Toaster }
