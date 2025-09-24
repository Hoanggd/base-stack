'use client'

import React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@workspace/ui/components/sidebar'
import { GalleryVerticalEnd } from 'lucide-react'
import { usePathname } from 'next/navigation'

// This is sample data.
const data = {
    versions: ['1.0.0'],
    navMain: [
        {
            title: 'Getting Started',
            url: '#',
            items: [
                {
                    title: 'Introduction',
                    url: '/docs/introduction',
                },
            ],
        },
        {
            title: 'Components',
            url: '#',
            items: [
                {
                    title: 'Calendar',
                    url: '/docs/components/calendar',
                },
                {
                    title: 'Range Calendar',
                    url: '/docs/components/range-calendar',
                },
                {
                    title: 'Datepicker',
                    url: '/docs/components/datepicker',
                },
                {
                    title: 'Range Datepicker',
                    url: '/docs/components/range-datepicker',
                },
                {
                    title: 'Pagination',
                    url: '/docs/components/pagination',
                },
                {
                    title: 'Searchable Select',
                    url: '/docs/components/searchable-select',
                },
            ],
        },
        {
            title: 'Form Examples',
            url: '#',
            items: [
                {
                    title: 'Basic',
                    url: '/docs/form-examples/basic',
                },
                {
                    title: 'Validation',
                    url: '/docs/form-examples/validation',
                },
                {
                    title: 'Conditional Fields',
                    url: '/docs/form-examples/conditional-fields',
                },
                {
                    title: 'Dependant Validation',
                    url: '/docs/form-examples/dependant-validation',
                },
                {
                    title: 'Parse and Transform',
                    url: '/docs/form-examples/parse-and-transform',
                },
                {
                    title: 'Submission Error',
                    url: '/docs/form-examples/submission-error',
                },
                {
                    title: 'Large Form',
                    url: '/docs/form-examples/large-form',
                },
            ],
        },
    ],
}

export function DocsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex gap-2 p-2">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none text-sm">
                        <span className="font-medium">Documentation</span>
                        <span className="">v1.0.0</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map(item => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map(item => {
                                    const isActive = pathname === item.url
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <a href={item.url}>{item.title}</a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
