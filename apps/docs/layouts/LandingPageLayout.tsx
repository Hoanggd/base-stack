import { GithubIcon } from '@/components/icons/GithubIcon'
import { Logo } from '@/components/Logo'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { GITHUB_URL } from '@/constants/common'
import { Link } from '@workspace/ui/components/Link'

const navLinks = [
    {
        label: 'Docs',
        href: '/docs/getting-started/introduction',
    },
]

export function LandingPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-neutral-950">
            <nav className="bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md sticky top-0 z-50">
                <div className="h-16 container max-w-screen-xl mx-auto flex items-center">
                    <Logo />
                    <div className="flex items-center gap-2 ml-4">
                        {navLinks.map(link => (
                            <Link variant={'unstyled'} href={link.href} key={link.href}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="ml-auto flex items-center">
                        <Link href={GITHUB_URL} target="_blank" className="ml-auto" variant="ghost" size="icon">
                            <GithubIcon />
                        </Link>
                        <ThemeSwitcher />
                    </div>
                </div>
            </nav>
            {children}
        </div>
    )
}
