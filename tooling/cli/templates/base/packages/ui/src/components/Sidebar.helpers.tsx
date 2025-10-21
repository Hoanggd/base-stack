import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Popover, PopoverDialog, PopoverTrigger } from '@workspace/ui/components/Popover'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarTrigger,
    useSidebar,
} from '@workspace/ui/components/Sidebar'
import { ChevronRight } from 'lucide-react'

interface SidebarNavigationMenuItem {
    title: string
    url: string
    icon?: React.FC
    isActive?: boolean
    items?: {
        title: string
        url: string
        isActive?: boolean
    }[]
}

interface SidebarNavigationMenuProps {
    items: Array<SidebarNavigationMenuItem>
    title?: string
    linkComponent?: React.FC<{ href: string }>
    className?: string
    currentPathname?: string
}

function SidebarNavigationMenu({
    items,
    title,
    className,
    linkComponent,
    currentPathname,
}: SidebarNavigationMenuProps) {
    const Sidebar = useSidebar()
    const isCollapsed = Sidebar.state === 'collapsed'
    const isMobile = Sidebar.isMobile

    const LinkComponent = linkComponent || 'a'

    return (
        <SidebarGroup className={className}>
            {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
            <SidebarMenu>
                {items.map(item => {
                    const hasChildren = item.items && item.items.length > 0
                    const isRootItemActive = currentPathname?.startsWith(item.url)

                    // no children
                    if (!hasChildren) {
                        return (
                            <SidebarMenuButton
                                isActive={isRootItemActive}
                                asChild
                                key={item.title}
                                tooltip={item.title}
                            >
                                <LinkComponent href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </LinkComponent>
                            </SidebarMenuButton>
                        )
                    }

                    // collapsed and not mobile
                    if (isCollapsed && !isMobile) {
                        return (
                            <PopoverTrigger key={item.title}>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-sidebar-foreground" />
                                </SidebarMenuButton>
                                <Popover placement="right top">
                                    <PopoverDialog className="min-w-[150px] p-2">
                                        <p className="text-xs font-medium text-sidebar-foreground mb-2">{item.title}</p>
                                        <ul className="space-y-0.5 list-none">
                                            {item.items?.map(subItem => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton
                                                        isActive={currentPathname?.startsWith(subItem.url)}
                                                        asChild
                                                    >
                                                        <LinkComponent href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </LinkComponent>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </ul>
                                    </PopoverDialog>
                                </Popover>
                            </PopoverTrigger>
                        )
                    }

                    // expanded
                    return (
                        <Collapsible asChild key={item.title} defaultOpen={true} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-sidebar-foreground" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-0.5">
                                    <SidebarMenuSub>
                                        {item.items?.map(subItem => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton
                                                    isActive={currentPathname?.startsWith(subItem.url)}
                                                    asChild
                                                >
                                                    <LinkComponent href={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </LinkComponent>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}

interface DashboardHeaderProps {
    children?: React.ReactNode
}

function DashboardHeader({ children }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-10 bg-background flex h-16 shrink-0 items-center gap-2 border-b w-full">
            <div className="flex items-center gap-2 px-4 w-full md:px-6">
                <SidebarTrigger className="-ml-1" />
                {children}
            </div>
        </header>
    )
}

export { SidebarNavigationMenu, DashboardHeader }
export type { SidebarNavigationMenuItem }
