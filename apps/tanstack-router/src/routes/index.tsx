import { ThemeSwitcher } from '@/shared/components/ThemeSwitcher'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@workspace/ui/components/Button'
import { toast } from '@workspace/ui/components/Sonner'

export const Route = createFileRoute('/')({
    component: WelcomePage,
})

function WelcomePage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center max-w-2xl mx-auto px-4">
                <ThemeSwitcher />

                <h1 className="text-4xl md:text-5xl font-bold my-6">Welcome to Tanstack Router</h1>
                <p className="text-lg text-muted-foreground">
                    A powerful routing library for React that enables type-safe, flexible, and scalable navigation in
                    your applications.
                </p>
                <Button
                    size="lg"
                    className="mt-6"
                    onClick={() =>
                        toast.success({
                            title: 'Welcome to Tanstack Router',
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
