import { GithubIcon } from '@/components/icons/GithubIcon'
import { Logo } from '@/components/Logo'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { GITHUB_URL } from '@/constants/common'
import { Button } from '@workspace/ui/components/Button'
import { DialogContent, DialogOverlay, DialogTrigger } from '@workspace/ui/components/Dialog'
import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarMenu } from './SidebarMenu'
import Link from 'next/link'

export function HamburgerMenu() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <div className="w-full flex items-center gap-1">
            <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                <Button variant="ghost" size="icon" className="size-10 [&>svg]:size-6">
                    <MenuIcon />
                </Button>
                <DialogOverlay>
                    <DialogContent className="pl-0">
                        <div>
                            <div className="px-6">
                                <Logo showName={false} />
                            </div>
                            <div className="h-[500px]">
                                <SidebarMenu />
                            </div>
                        </div>
                    </DialogContent>
                </DialogOverlay>
            </DialogTrigger>

            <div className="flex items-center gap-1 ml-auto">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={GITHUB_URL}>
                        <GithubIcon />
                    </Link>
                </Button>
                <ThemeSwitcher />
            </div>
        </div>
    )
}
