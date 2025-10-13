import { Logo } from '@/shared/components/Logo'
import { TopNavLinks } from '@/shared/layouts/TopNavLinks'
import { HeaderIconButtons } from '@/shared/layouts/HeaderIconButtons'

export function LandingPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-background-secondary relative">
            <img
                src="/hero-background.webp"
                alt="Hero Section"
                className="absolute top-0 left-0 w-full h-[800px] blur-3xl opacity-30 dark:invert dark:hue-rotate-180 pointer-events-none"
            />
            <nav className="relative top-0 z-10">
                <div className="px-3">
                    <div className="px-3 border-x h-16 container max-w-screen-xl mx-auto flex items-center gap-7 md:px-8">
                        <Logo withName={false} />
                        <TopNavLinks />
                        <div className="flex-1" />
                        <HeaderIconButtons />
                    </div>
                </div>
            </nav>
            <div className="z-10 relative">{children}</div>
        </main>
    )
}
