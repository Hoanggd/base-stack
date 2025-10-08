'use client'

import { toast } from '@workspace/ui/components/Sonner'

import { Button } from '@workspace/ui/components/Button'

export function SonnerDemo() {
    return (
        <div className="grid grid-cols-3 gap-2">
            <Button
                variant="outline"
                onClick={() =>
                    toast.success({
                        title: 'Welcome aboard! 🎉',
                        description: 'Account created successfully.',
                    })
                }
            >
                Success
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast.error({
                        title: 'Oops! Something went wrong',
                        description: 'Please try again.',
                    })
                }
            >
                Error
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast.info({
                        title: 'New feature available!',
                        description: 'Check the dashboard for updates.',
                    })
                }
            >
                Info
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast.warning({
                        title: 'Storage space running low',
                        description: '85% storage used.',
                    })
                }
            >
                Warning
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast.neutral({
                        title: 'System maintenance scheduled',
                        description: '2 hours downtime tomorrow at 2 AM.',
                    })
                }
            >
                Neutral
            </Button>
        </div>
    )
}
