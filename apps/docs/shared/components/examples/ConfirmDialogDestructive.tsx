'use client'

import { Button } from '@workspace/ui/components/Button'
import { confirm } from '@workspace/ui/components/ConfirmDialog'
import { toast } from '@workspace/ui/components/Sonner'

export function ConfirmDialogDestructive() {
    const handleClick = () => {
        confirm({
            variant: 'destructive',
            title: 'Archive Project',
            description: 'You can restore an archived project later from settings.',
            action: {
                label: 'Archive',
                onClick: () => {
                    toast.success({
                        title: 'Project Archived',
                        description: 'Project archived successfully',
                    })
                },
            },
        })
    }

    return (
        <Button variant="outline" onClick={handleClick}>
            Archive Project
        </Button>
    )
}
