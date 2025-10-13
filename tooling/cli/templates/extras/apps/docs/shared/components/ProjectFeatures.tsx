import { NextJsIcon } from '@/shared/components/icons/NextJsIcon'
import { ReactIcon } from '@/shared/components/icons/ReactIcon'
import { ShadcnIcon } from '@/shared/components/icons/ShadcnIcon'
import { ViteIcon } from '@/shared/components/icons/ViteIcon'
import { cn } from '@workspace/ui/lib/utils'
import { ArrowUpRightIcon, Database, FormInput, PackageIcon, SquareTerminal, SwatchBook } from 'lucide-react'
import Link from 'next/link'

interface FeaturesProps {
    className?: string
    variant?: 'landing' | 'docs'
}

export function ProjectFeatures({ className, variant = 'landing' }: FeaturesProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 not-prose',
                variant === 'docs' && 'gap-4',
                className,
            )}
        >
            <FeatureCard
                variant={variant}
                icons={
                    <div className="flex gap-1.5">
                        <FeatureIcon className="bg-blue-500/10">
                            <ReactIcon className="size-6" />
                        </FeatureIcon>
                        <FeatureIcon className="bg-blue-500/10">
                            <NextJsIcon className="size-6 opacity-90" />
                        </FeatureIcon>
                        <FeatureIcon className="bg-blue-500/10">
                            <ViteIcon className="size-6" />
                        </FeatureIcon>
                        <FeatureIcon className="bg-blue-500/10">
                            <ShadcnIcon className="size-6" />
                        </FeatureIcon>
                    </div>
                }
                title="Modern Tech Stack"
                description="Modern technologies for developing high-quality frontend apps"
                url="/docs/guide/tech-stack"
            />
            <FeatureCard
                variant={variant}
                icons={
                    <FeatureIcon className="text-green-500 bg-green-500/10">
                        <PackageIcon strokeWidth={1.5} />
                    </FeatureIcon>
                }
                title="Opinionated Folder Structure"
                description="Scalable folder structure for managing multiple apps"
                url="/docs/guide/installation#project-structure"
            />
            <FeatureCard
                variant={variant}
                icons={
                    <FeatureIcon className="text-cyan-500 bg-cyan-500/10">
                        <SquareTerminal strokeWidth={1.5} />
                    </FeatureIcon>
                }
                title="CLI Tool"
                description="Command-line tool for scaffolding and managing Base Stack monorepos and applications"
                url="/docs/guide/cli"
            />
            <FeatureCard
                variant={variant}
                icons={
                    <FeatureIcon className="text-purple-500 bg-purple-500/10">
                        <SwatchBook strokeWidth={1.5} />
                    </FeatureIcon>
                }
                title="Components Library"
                description="Accessibility-first components built with shadcn/ui for better UX"
                url="/docs/ui"
            />
            <FeatureCard
                variant={variant}
                icons={
                    <FeatureIcon className="text-orange-500 bg-orange-500/10">
                        <FormInput strokeWidth={1.5} />
                    </FeatureIcon>
                }
                title="Form Handling"
                description="Recommended patterns for handling forms using React Hook Form and Zod"
                url="/docs/guide/form-overview"
            />
            <FeatureCard
                variant={variant}
                icons={
                    <FeatureIcon className="text-red-500 bg-red-500/10">
                        <Database strokeWidth={1.5} />
                    </FeatureIcon>
                }
                title="Data Fetching Strategy"
                description="Suggested methods for handling data requests with TanStack Query"
                url="/docs/guide/data-fetching-overview"
            />
        </div>
    )
}

interface FeatureCardProps {
    icons: React.ReactNode
    title: string
    description: string
    iconClassName?: string
    url?: string
    variant?: 'landing' | 'docs'
}

function FeatureCard({ icons, title, description, url = '#', variant = 'landing' }: FeatureCardProps) {
    return (
        <Link
            href={url}
            className={cn(
                'group relative flex flex-col justify-between gap-5 p-3 transition-colors h-full bg-background hover:bg-background-secondary md:p-8',
                variant === 'landing' && 'border-t border-r',
                variant === 'docs' && 'border rounded-lg md:p-4',
            )}
        >
            <ArrowUpRightIcon className="transition-transform size-6 stroke-1 absolute top-3 right-3 opacity-0 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
            <div>
                <h2 className="font-medium">{title}</h2>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>
            {icons}
        </Link>
    )
}

interface FeatureIconProps {
    children: React.ReactNode
    className?: string
}

function FeatureIcon({ children, className }: FeatureIconProps) {
    return (
        <div
            className={cn('w-11 h-11 bg-background-tertiary/90 rounded-lg flex items-center justify-center', className)}
        >
            {children}
        </div>
    )
}
