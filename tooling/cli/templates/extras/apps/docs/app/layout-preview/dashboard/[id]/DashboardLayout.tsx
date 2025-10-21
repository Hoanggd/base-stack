'use client'

import { Avatar, AvatarFallback } from '@workspace/ui/components/Avatar'
import {
    DashboardHeader,
    SidebarNavigationMenu,
    SidebarNavigationMenuItem,
} from '@workspace/ui/components/Sidebar.helpers'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
} from '@workspace/ui/components/Sidebar'
import { Logo } from '@/shared/components/Logo'
import {
    HelpCircleIcon,
    HomeIcon,
    LayoutGridIcon,
    MessageCircleIcon,
    SettingsIcon,
    ShapesIcon,
    UserIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MAIN_ITEMS: Array<SidebarNavigationMenuItem> = [
    {
        title: 'Playground',
        url: '/layout-preview/dashboard',
        icon: HomeIcon,
        items: [
            {
                title: 'History',
                url: '/layout-preview/dashboard/history',
            },
            {
                title: 'Templates',
                url: '/layout-preview/dashboard/templates',
            },
            {
                title: 'Starred',
                url: '/layout-preview/dashboard/starred',
            },
        ],
    },
    {
        title: 'Profile',
        icon: UserIcon,
        url: '/layout-preview/dashboard/profile',
    },
    {
        title: 'Settings',
        icon: SettingsIcon,
        url: '/layout-preview/dashboard/settings',
    },
]

const PROJECTS_ITEMS: Array<SidebarNavigationMenuItem> = [
    {
        title: 'Design System',
        url: '/layout-preview/dashboard/design-system',
        icon: ShapesIcon,
    },
    {
        title: 'UI Components',
        url: '/layout-preview/dashboard/components',
        icon: LayoutGridIcon,
    },
]

const SECONDARY_ITEMS: Array<SidebarNavigationMenuItem> = [
    {
        title: 'Help',
        url: '/layout-preview/dashboard/help',
        icon: HelpCircleIcon,
    },
    {
        title: 'Feedback',
        url: '/layout-preview/dashboard/feedback',
        icon: MessageCircleIcon,
    },
]

interface DashboardLayoutProps {
    children: React.ReactNode
    defaultOpen?: boolean
}

export function DashboardLayout({ children, defaultOpen = true }: DashboardLayoutProps) {
    const currentPathname = usePathname()

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <Logo
                        className="ml-0.5"
                        textClassName="transition-opacity group-data-[collapsible=icon]:opacity-0"
                    />
                </SidebarHeader>

                <SidebarContent>
                    <SidebarNavigationMenu linkComponent={Link} items={MAIN_ITEMS} currentPathname={currentPathname} />
                    <SidebarNavigationMenu
                        title="Projects"
                        linkComponent={Link}
                        items={PROJECTS_ITEMS}
                        currentPathname={currentPathname}
                        className="mt-6"
                    />
                    <SidebarNavigationMenu
                        linkComponent={Link}
                        items={SECONDARY_ITEMS}
                        className="mt-auto"
                        currentPathname={currentPathname}
                    />
                </SidebarContent>

                <SidebarFooter>{/* footer  */}</SidebarFooter>
            </Sidebar>

            <SidebarInset>
                <DashboardHeader>
                    <Avatar className="ml-auto">
                        <AvatarFallback>HP</AvatarFallback>
                    </Avatar>
                </DashboardHeader>
                <div className="p-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
