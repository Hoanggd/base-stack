import { Logo } from '@/components/Logo'
import { TopNavLinks } from '@/layouts/_shared/TopNavLinks'
import { HeaderIconButtons } from './_shared/HeaderIconButtons'

export function LandingPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-background-secondary">
            <nav className="bg-background-secondary/70 backdrop-blur-md sticky top-0 z-50">
                <div className="px-5 h-16 container max-w-screen-xl mx-auto flex items-center gap-7 md:px-8">
                    <Logo withName={false} />
                    <TopNavLinks />
                    <div className="flex-1" />
                    <HeaderIconButtons />
                </div>
            </nav>
            {children}
        </main>
    )
}
