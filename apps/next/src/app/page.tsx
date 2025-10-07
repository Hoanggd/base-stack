'use client'

import { Button } from '@workspace/ui/components/Button'
import { toast } from '@workspace/ui/components/Sonner'
import { ThemeSwitcher } from '@/shared/components/ThemeSwitcher'

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center max-w-2xl mx-auto px-4">
                <ThemeSwitcher />
                <h1 className="text-4xl md:text-5xl font-bold my-6">Welcome to Next.js</h1>
                <p className="text-lg text-muted-foreground">
                    A modern, full-stack development platform with everything you need to create beautiful, performant
                    applications with TypeScript, React, and more.
                </p>
                <Button
                    size="lg"
                    className="mt-6"
                    onClick={() =>
                        toast.success({
                            title: 'Welcome to Next.js',
                            description:
                                'You have successfully launched the starter project. Explore and start building your next great idea!',
                        })
                    }
                >
                    Welcome
                </Button>
            </div>
        </div>
    )
}
