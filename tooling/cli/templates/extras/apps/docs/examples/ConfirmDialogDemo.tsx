'use client'

import { Button } from '@workspace/ui/components/Button'
import { confirm } from '@workspace/ui/components/ConfirmDialog'
import { toast } from '@workspace/ui/components/Sonner'

export function ConfirmDialogDemo() {
    const handleDeleteUsers = () => {
        confirm({
            title: 'Delete Users',
            description: 'Are you sure you want to delete these users?',
            action: {
                label: 'Delete',
                onClick: () => {
                    toast.success({
                        title: 'Users Deleted',
                        description: 'Users deleted successfully',
                    })
                },
            },
        })
    }

    return (
        <Button variant="outline" onClick={handleDeleteUsers}>
            Delete Users
        </Button>
    )
}
