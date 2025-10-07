import { cn } from '@workspace/ui/lib/utils'
import { BookIcon, Database, FormInput, PackageIcon, SquareTerminal, SwatchBook } from 'lucide-react'

export function FeaturesSection() {
    return (
        <section>
            <div className="px-5 container max-w-screen-xl mx-auto py-10 space-y-7 md:py-20 md:px-8">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold">Everything You Need</h2>
                    <p className="text-lg">Production-ready boilerplate with best-in-class tools and patterns</p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                    <FeatureCard
                        icon={<PackageIcon strokeWidth={1.5} />}
                        title="Monorepo Structure"
                        description="Scalable monorepo setup with pnpm workspaces and Turborepo for managing multiple apps"
                        iconClassName="text-blue-500 bg-blue-500/10"
                    />
                    <FeatureCard
                        title="CLI Tool"
                        description="Command-line tool for scaffolding and managing Base Stack monorepos and applications"
                        icon={<SquareTerminal strokeWidth={1.5} />}
                        iconClassName="text-cyan-500 bg-cyan-500/10"
                    />
                    <FeatureCard
                        icon={<BookIcon strokeWidth={1.5} />}
                        title="Best Practices"
                        description="Best practices for building production-ready applications"
                        iconClassName="text-green-500 bg-green-500/10"
                    />
                    <FeatureCard
                        title="React Aria Components"
                        description="Accessibility-first components built with React Aria instead of Radix UI for better UX"
                        icon={<SwatchBook strokeWidth={1.5} />}
                        iconClassName="text-purple-500 bg-purple-500/10"
                    />

                    <FeatureCard
                        title="TanStack Query"
                        description="Powerful async state management with caching, background updates, and error handling"
                        icon={<Database strokeWidth={1.5} />}
                        iconClassName="text-red-500 bg-red-500/10"
                    />

                    <FeatureCard
                        title="Form Management"
                        description="React Hook Form + Zod validation for performant forms with TypeScript integration"
                        icon={<FormInput strokeWidth={1.5} />}
                        iconClassName="text-orange-500 bg-orange-500/10"
                    />
                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
    iconClassName?: string
}

function FeatureCard({ icon, title, description, iconClassName }: FeatureCardProps) {
    return (
        <div className="flex flex-col border bg-linear-to-b from-background to-background-secondary p-4 rounded-xl h-full">
            <div
                className={cn(
                    'w-12 h-12 bg-background-tertiary/90 rounded-lg flex items-center justify-center mb-5',
                    iconClassName,
                )}
            >
                {icon}
            </div>
            <div className="flex-1" />
            <h2 className="font-medium">{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
    )
}
