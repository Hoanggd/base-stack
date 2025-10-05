'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/Button'
import Link from 'next/link'

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
                    <Button
                        asChild
                        key={link.href}
                        variant={'unstyled'}
                        className={cn('px-0 text-muted-foreground', isActive && 'text-foreground')}
                    >
                        <Link href={link.href}>{link.label}</Link>
                    </Button>
                )
            })}
        </div>
    )
}
