'use client'

import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
} from '@workspace/ui/components/Dialog'
import { Button, ButtonProps } from '@workspace/ui/components/Button'
import { createStore } from '@xstate/store'
import { useSelector } from '@xstate/store/react'
import React from 'react'

interface Action {
    label: React.ReactNode
    onClick: () => void | Promise<void>
    buttonProps?: ButtonProps
}

interface ConfirmDialogContext {
    /** Indicates whether the confirm dialog is open */
    isOpen: boolean
    /** Data for the confirm dialog, including title, description, and actions */
    data?: {
        /** The title displayed in the confirm dialog */
        title: string
        /** Optional description displayed in the confirm dialog */
        description?: string
        /** Optional action button configuration */
        action?: Action
        /** Optional cancel button configuration */
        cancel?: Action
    }
}

const confirmStore = createStore({
    context: {
        isOpen: false,
    } as ConfirmDialogContext,
    on: {
        open: (_, data: ConfirmDialogContext['data']) => ({
            isOpen: true,
            data,
        }),
        close: context => ({ ...context, isOpen: false }),
    },
})

const { open, close } = confirmStore.trigger

const confirm = (data: ConfirmDialogContext['data']) => {
    if (!data) return

    open(data)
}

function ConfirmDialog() {
    const isOpen = useSelector(confirmStore, state => state.context.isOpen)
    const data = useSelector(confirmStore, state => state.context.data)

    const handleCancel = () => {
        data?.cancel?.onClick?.()
        close()
    }

    const handleAction = async () => {
        data?.action?.onClick?.()
        close()
    }

    return (
        <DialogOverlay
            isOpen={isOpen}
            onOpenChange={isOpen => {
                if (!isOpen) {
                    close()
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]" isFullscreenOnMobile={false} closeButton={false}>
                <div className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>{data?.title || 'Confirm'}</DialogTitle>
                        <DialogDescription>
                            {data?.description || 'Are you sure you want to confirm?'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost" onClick={handleCancel} {...data?.cancel?.buttonProps}>
                            {data?.cancel?.label || 'Cancel'}
                        </Button>
                        <Button onClick={handleAction} {...data?.action?.buttonProps}>
                            {data?.action?.label || 'Confirm'}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </DialogOverlay>
    )
}

export { ConfirmDialog, confirm }
