'use client'

import React from 'react'
import { X } from 'lucide-react'
import {
    Dialog as AriaDialog,
    DialogProps as AriaDialogProps,
    DialogTrigger as AriaDialogTrigger,
    Heading as AriaHeading,
    HeadingProps as AriaHeadingProps,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
    ModalOverlayProps as AriaModalOverlayProps,
    composeRenderProps,
} from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/Button'

const Sheet = AriaDialog

const SheetTrigger = AriaDialogTrigger

const SheetOverlay = ({ className, isDismissable = true, ...props }: AriaModalOverlayProps) => (
    <AriaModalOverlay
        isDismissable={isDismissable}
        className={composeRenderProps(className, className =>
            cn(
                'fixed inset-0 z-50 bg-black/70 duration-300',
                /* Exiting */
                'data-[exiting]:animate-out data-[exiting]:fade-out-0',
                /* Entering */
                'data-[entering]:animate-in data-[entering]:fade-in-0',
                className,
            ),
        )}
        {...props}
    />
)

interface SheetContentProps extends Omit<React.ComponentProps<typeof AriaModal>, 'children'> {
    children?: AriaDialogProps['children']
    role?: AriaDialogProps['role']
    closeButton?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
}

const SheetContent = ({
    className,
    children,
    role,
    closeButton = true,
    side = 'right',
    ...props
}: SheetContentProps) => (
    <SheetOverlay>
        <AriaModal
            className={composeRenderProps(className, className =>
                cn(
                    'bg-background duration-300 data-[entering]:animate-in data-[exiting]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out',
                    side === 'right' &&
                        'data-[exiting]:slide-out-to-right data-[entering]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
                    side === 'left' &&
                        'data-[exiting]:slide-out-to-left data-[entering]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
                    side === 'top' &&
                        'data-[exiting]:slide-out-to-top data-[entering]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
                    side === 'bottom' &&
                        'data-[exiting]:slide-out-to-bottom data-[entering]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
                    className,
                ),
            )}
            {...props}
        >
            <AriaDialog role={role} className={cn('grid h-full gap-4', 'h-full outline-none')}>
                {composeRenderProps(children, (children, renderProps) => (
                    <>
                        {children}
                        {closeButton && (
                            <Button
                                onClick={renderProps.close}
                                size="icon"
                                variant="ghost"
                                className="absolute right-2.5 top-2.5"
                            >
                                <X className="size-4! text-muted-foreground" />
                                <span className="sr-only">Close</span>
                            </Button>
                        )}
                    </>
                ))}
            </AriaDialog>
        </AriaModal>
    </SheetOverlay>
)

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />
)

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
)

const SheetTitle = ({ className, ...props }: AriaHeadingProps) => (
    <AriaHeading slot="title" className={cn('ttext-foreground font-semibold', className)} {...props} />
)

const SheetDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('text-muted-foreground text-sm', className)} {...props} />
)

export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger }
export type { SheetContentProps }
