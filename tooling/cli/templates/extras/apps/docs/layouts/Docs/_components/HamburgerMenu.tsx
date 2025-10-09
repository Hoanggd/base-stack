import { Logo } from '@/components/Logo'
import { Button } from '@workspace/ui/components/Button'
import { DialogContent, DialogOverlay, DialogTrigger } from '@workspace/ui/components/Dialog'
import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarMenu } from '@/layouts/Docs/_components/SidebarMenu'
import { ModulePicker } from '@/layouts/Docs/_components/ModulePicker'

export function HamburgerMenu() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button variant="ghost" size="icon" className="size-10 [&>svg]:size-6">
                <MenuIcon />
            </Button>
            <DialogOverlay>
                <DialogContent className="pl-0">
                    <div>
                        <div className="px-6">
                            <Logo withName={false} />
                        </div>
                        <ModulePicker />
                        <div className="h-[400px]">
                            <SidebarMenu />
                        </div>
                    </div>
                </DialogContent>
            </DialogOverlay>
        </DialogTrigger>
    )
}
