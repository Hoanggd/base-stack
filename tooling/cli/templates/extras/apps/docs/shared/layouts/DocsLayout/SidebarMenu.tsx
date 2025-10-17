'use client'
import { ModuleValue, useModulePicker } from '@/shared/layouts/DocsLayout/ModulePicker'
import { ScrollArea } from '@workspace/ui/components/ScrollArea'
import { cn } from '@workspace/ui/lib/utils'
import dayjs from 'dayjs'
import {
    BlocksIcon,
    BookOpenIcon,
    BrainIcon,
    ListChecksIcon,
    NetworkIcon,
    SettingsIcon,
    SquareTerminalIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface MenuItem {
    title: string
    href: string
    icon?: React.ReactElement
    /**YYYY-MM-DD */
    createdAt?: string
}

interface MenuGroup {
    title: string
    items: MenuItem[]
}

function getMenuGroups(module: string): MenuGroup[] {
    if (module === ModuleValue.Overview) {
        return [
            {
                title: 'Getting Started',
                items: [
                    {
                        title: 'Introduction',
                        href: '/docs/guide/introduction',
                        icon: <BookOpenIcon size={16} strokeWidth={1.5} />,
                    },
                    {
                        title: 'Tech Stack',
                        href: '/docs/guide/tech-stack',
                        icon: <BlocksIcon size={16} strokeWidth={1.5} />,
                    },
                    {
                        title: 'Installation',
                        href: '/docs/guide/installation',
                        icon: <SettingsIcon size={16} strokeWidth={1.5} />,
                    },
                    {
                        title: 'CLI Tool',
                        href: '/docs/guide/cli',
                        icon: <SquareTerminalIcon size={16} strokeWidth={1.5} />,
                    },
                    {
                        title: 'Decisions on DX',
                        href: '/docs/guide/decisions-on-dx',
                        icon: <ListChecksIcon size={16} strokeWidth={1.5} />,
                    },
                    {
                        title: 'React Folder Structure',
                        href: '/docs/guide/react-folder-structure',
                        icon: <NetworkIcon size={16} strokeWidth={1.5} />,
                    },
                    {
                        title: 'Philosophy',
                        href: '/docs/guide/philosophy',
                        icon: <BrainIcon size={16} strokeWidth={1.5} />,
                    },
                ],
            },
            {
                title: 'Form Management',
                items: [
                    {
                        title: 'Overview',
                        href: '/docs/guide/form-overview',
                    },
                    {
                        title: 'Basic Form',
                        href: '/docs/guide/form-basic',
                    },
                    {
                        title: 'Form with Loading',
                        href: '/docs/guide/form-with-loading',
                    },
                    {
                        title: 'Validation Form',
                        href: '/docs/guide/form-validation',
                    },
                    {
                        title: 'Dependent Validation',
                        href: '/docs/guide/form-dependant-validation',
                    },
                    {
                        title: 'Conditional Fields',
                        href: '/docs/guide/form-conditional-fields',
                    },
                    {
                        title: 'Field Array',
                        href: '/docs/guide/form-field-array',
                    },
                    {
                        title: 'Submission Errors',
                        href: '/docs/guide/form-submission-errors',
                    },
                    {
                        title: 'Large Form',
                        href: '/docs/guide/form-large',
                    },
                ],
            },
            {
                title: 'Data Fetching',
                items: [
                    {
                        title: 'Overview',
                        href: '/docs/guide/data-fetching-overview',
                    },
                    {
                        title: 'Build an API Client',
                        href: '/docs/guide/data-fetching-api-client',
                    },
                    {
                        title: 'Data Invalidation Best Practices',
                        href: '/docs/guide/data-fetching-invalidation',
                    },
                    {
                        title: 'Enhancing User Experience',
                        href: '/docs/guide/data-fetching-enhance-ux',
                    },
                ],
            },
        ]
    }

    if (module === ModuleValue.UI) {
        return [
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
                        title: 'DataTable',
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
                    {
                        title: 'Uploader',
                        href: '/docs/ui/uploader',
                        createdAt: '2025-10-17',
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
                        title: 'ConfirmDialog',
                        href: '/docs/ui/confirm-dialog',
                    },
                    {
                        title: 'Menu',
                        href: '/docs/ui/menu',
                    },
                    {
                        title: 'Popover',
                        href: '/docs/ui/popover',
                    },
                    {
                        title: 'Tooltip',
                        href: '/docs/ui/tooltip',
                    },
                    {
                        title: 'Select',
                        href: '/docs/ui/select',
                    },
                ],
            },
            {
                title: 'Feedback',
                items: [
                    {
                        title: 'Sonner',
                        href: '/docs/ui/sonner',
                    },
                    {
                        title: 'Spinner',
                        href: '/docs/ui/spinner',
                    },
                    {
                        title: 'LoadingOverlay',
                        href: '/docs/ui/loading-overlay',
                    },
                    {
                        title: 'NProgress',
                        href: '/docs/ui/nprogress',
                    },
                ],
            },
        ]
    }

    return []
}

export function SidebarMenu() {
    const selectedModule = useModulePicker()
    const groups = getMenuGroups(selectedModule.value)

    return (
        <div className="relative h-full z-[1]">
            <div className="absolute z-[1] top-0 left-0 right-6 h-7 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
            <div className="absolute inset-0">
                <ScrollArea className="h-full -translate-x-px">
                    <div className="">
                        <div className="pb-24">
                            <div className="h-6" />
                            {groups.map(group => (
                                <div className="mb-6 space-y-1" key={group.title}>
                                    {group.title && (
                                        <div>
                                            <h3 className="px-6 flex items-center text-xs uppercase tracking-wide text-muted-foreground/70">
                                                {group.title}
                                            </h3>
                                        </div>
                                    )}
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

function MenuItem({ title, href, icon, createdAt }: MenuItem) {
    const pathname = usePathname()
    const isActive = pathname === href

    const isNew = createdAt ? dayjs(createdAt).isAfter(dayjs().subtract(1, 'week')) : false

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
            {isNew && <span className="text-xs bg-primary text-white px-1 py-0.5 rounded">new</span>}
        </Link>
    )
}
