'use client'
import { ModuleValue, useModulePicker } from '@/layouts/Docs/_components/ModulePicker'
import { ScrollArea } from '@workspace/ui/components/ScrollArea'
import { cn } from '@workspace/ui/lib/utils'
import { BoltIcon, BookOpen, BrainIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type MenuItem = {
    title: string
    href: string
    icon?: React.ReactElement
}

type MenuGroup = {
    title: string
    items: MenuItem[]
}

function getMenuGroups(module: string): MenuGroup[] {
    if (module === ModuleValue.UI) {
        return [
            {
                title: 'Getting Started',
                items: [
                    {
                        title: 'Introduction',
                        href: '/docs/getting-started/introduction',
                        icon: <BookOpen size={16} strokeWidth={1.5} />,
                    },
                    {
                        title: 'Installation',
                        href: '/docs/getting-started/installation',
                        icon: <BoltIcon size={16} strokeWidth={1.5} />,
                    },
                    {
                        title: 'Philosophy',
                        href: '/docs/getting-started/philosophy',
                        icon: <BrainIcon size={16} strokeWidth={1.5} />,
                    },
                ],
            },
            {
                title: 'Buttons',
                items: [
                    {
                        title: 'Button',
                        href: '/docs/ui/button',
                    },
                ],
            },
            {
                title: 'Collections',
                items: [
                    {
                        title: 'Table',
                        href: '/docs/ui/table',
                    },
                    {
                        title: 'Data Table',
                        href: '/docs/ui/data-table',
                    },
                    {
                        title: 'Pagination',
                        href: '/docs/ui/pagination',
                    },
                ],
            },
            {
                title: 'Date and Time',
                items: [
                    {
                        title: 'Calendar',
                        href: '/docs/ui/calendar',
                    },
                    {
                        title: 'RangeCalendar',
                        href: '/docs/ui/range-calendar',
                    },
                    {
                        title: 'DatePicker',
                        href: '/docs/ui/date-picker',
                    },
                    {
                        title: 'DateRangePicker',
                        href: '/docs/ui/date-range-picker',
                    },
                    {
                        title: 'DateField',
                        href: '/docs/ui/date-field',
                    },
                    {
                        title: 'TimeField',
                        href: '/docs/ui/time-field',
                    },
                ],
            },
            {
                title: 'Form Fields',
                items: [
                    {
                        title: 'Input',
                        href: '/docs/ui/input',
                    },
                    {
                        title: 'Textarea',
                        href: '/docs/ui/textarea',
                    },
                    {
                        title: 'NumberField',
                        href: '/docs/ui/number-field',
                    },
                    {
                        title: 'Checkbox',
                        href: '/docs/ui/checkbox',
                    },
                    {
                        title: 'RadioGroup',
                        href: '/docs/ui/radio-group',
                    },
                    {
                        title: 'Switch',
                        href: '/docs/ui/switch',
                    },
                ],
            },
            {
                title: 'Overlays',
                items: [
                    {
                        title: 'Dialog',
                        href: '/docs/ui/dialog',
                    },
                    {
                        title: 'Popover',
                        href: '/docs/ui/popover',
                    },
                    {
                        title: 'Tooltip',
                        href: '/docs/ui/tooltip',
                    },
                ],
            },
            {
                title: 'Pickers',
                items: [
                    {
                        title: 'Select',
                        href: '/docs/ui/select',
                    },
                ],
            },
        ]
    }

    if (module === ModuleValue.Form) {
        return [
            {
                title: 'Forms',
                items: [],
            },
        ]
    }

    return [
        {
            title: 'Templates',
            items: [],
        },
    ]
}

export function SidebarMenu() {
    const selectedModule = useModulePicker()
    const groups = getMenuGroups(selectedModule.value)

    return (
        <div className="relative h-full z-[1]">
            <div className="absolute z-[1] top-0 left-0 right-6 h-5 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
            <div className="absolute inset-0">
                <ScrollArea className="h-full  -translate-x-px">
                    <div className="">
                        <div className="pb-24">
                            <div className="h-10" />
                            {groups.map(group => (
                                <div className="mb-7 space-y-1" key={group.title}>
                                    <div>
                                        <h3 className="px-6 flex items-center text-xs uppercase tracking-wide text-muted-foreground/70">
                                            {group.title}
                                        </h3>
                                    </div>
                                    {group.items.map(item => (
                                        <MenuItem {...item} key={item.title} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

function MenuItem({ title, href, icon }: MenuItem) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            className={cn(
                'flex items-center gap-2 text-sm px-[23px] h-8 transition-colors text-muted-foreground border-l border-transparent focus-visible:outline-none focus-visible:bg-background-secondary',
                isActive
                    ? 'text-foreground border-foreground font-medium'
                    : 'hover:text-foreground hover:border-foreground/20',
            )}
            href={href}
        >
            {icon}
            {title}
        </Link>
    )
}
