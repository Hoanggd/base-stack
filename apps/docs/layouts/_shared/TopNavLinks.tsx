'use client'

import { Link } from '@workspace/ui/components/Link'
import { usePathname } from 'next/navigation'
import { cn } from '@workspace/ui/lib/utils'

const navLinks = [
    {
        label: 'Components',
        href: '/docs/ui',
    },
    {
        label: 'Recipes',
        href: '/docs/recipes',
    },
]

export function TopNavLinks() {
    const pathname = usePathname()

    return (
        <div className="flex items-center gap-5">
            {navLinks.map(link => {
                const isActive = pathname.includes(link.href)

                return (
                    <Link
                        variant={'unstyled'}
                        href={link.href}
                        key={link.href}
                        className={cn('px-0 text-muted-foreground', isActive && 'text-foreground')}
                    >
                        {link.label}
                    </Link>
                )
            })}
        </div>
    )
}
