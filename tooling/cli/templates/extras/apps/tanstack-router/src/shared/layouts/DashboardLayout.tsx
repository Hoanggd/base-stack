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
import {
    HelpCircleIcon,
    HomeIcon,
    LayoutGridIcon,
    MessageCircleIcon,
    SettingsIcon,
    ShapesIcon,
    UserIcon,
} from 'lucide-react'
import { Link, LinkComponentProps, useRouterState } from '@tanstack/react-router'

const MAIN_ITEMS: Array<SidebarNavigationMenuItem> = [
    {
        title: 'Playground',
        url: '/dashboard',
        icon: HomeIcon,
        items: [
            {
                title: 'History',
                url: '/dashboard/history',
            },
            {
                title: 'Templates',
                url: '/dashboard/templates',
            },
            {
                title: 'Starred',
                url: '/dashboard/starred',
            },
        ],
    },
    {
        title: 'Profile',
        icon: UserIcon,
        url: '/dashboard/profile',
    },
    {
        title: 'Settings',
        icon: SettingsIcon,
        url: '/dashboard/settings',
    },
]

const PROJECTS_ITEMS: Array<SidebarNavigationMenuItem> = [
    {
        title: 'Design System',
        url: '/dashboard/design-system',
        icon: ShapesIcon,
    },
    {
        title: 'UI Components',
        url: '/dashboard/components',
        icon: LayoutGridIcon,
    },
]

const SECONDARY_ITEMS: Array<SidebarNavigationMenuItem> = [
    {
        title: 'Help',
        url: '/dashboard/help',
        icon: HelpCircleIcon,
    },
    {
        title: 'Feedback',
        url: '/dashboard/feedback',
        icon: MessageCircleIcon,
    },
]

function CustomLink({ href, ...props }: LinkComponentProps & { href: any }) {
    return <Link to={href} {...props} />
}

interface DashboardLayoutProps {
    children: React.ReactNode
    defaultOpen?: boolean
}

export function DashboardLayout({ children, defaultOpen = true }: DashboardLayoutProps) {
    const currentPathname = useRouterState().location.pathname

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <h1 className="text-2xl font-bold">BS</h1>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarNavigationMenu
                        linkComponent={CustomLink}
                        items={MAIN_ITEMS}
                        currentPathname={currentPathname}
                    />
                    <SidebarNavigationMenu
                        title="Projects"
                        linkComponent={CustomLink}
                        items={PROJECTS_ITEMS}
                        currentPathname={currentPathname}
                        className="mt-6"
                    />
                    <SidebarNavigationMenu
                        linkComponent={CustomLink}
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
