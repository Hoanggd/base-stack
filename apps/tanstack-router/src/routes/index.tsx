import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@workspace/ui/components/Button'
import { toast } from '@workspace/ui/components/Sonner'

export const Route = createFileRoute('/')({
    component: WelcomePage,
})

function WelcomePage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-16">
                        <h1 className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground mb-6">
                            Welcome to
                            <div>Your App</div>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            A beautiful, modern application built with TanStack Router and React. Start building
                            something amazing today.
                        </p>
                        <Button
                            size="lg"
                            onClick={() =>
                                toast.success({
                                    title: 'Welcome to Your App!',
                                    description:
                                        'You have successfully launched the starter project. Explore and start building your next great idea!',
                                })
                            }
                        >
                            Welcome
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
