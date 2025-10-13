'use client'

import { Button } from '@workspace/ui/components/Button'
import { Popover, PopoverDialog, PopoverTrigger } from '@workspace/ui/components/Popover'
import { cn } from '@workspace/ui/lib/utils'
import { BookIcon, ChevronDown, Layers2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export enum ModuleValue {
    Overview = 'guide',
    UI = 'ui',
}

interface Module {
    value: ModuleValue
    label: string
    icon: React.ReactNode
    description: string
    className?: string
}

const modules: Module[] = [
    {
        value: ModuleValue.Overview,
        label: 'Guide',
        icon: <BookIcon className="size-4!" />,
        description: 'Overview and guide',
        className: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
        value: ModuleValue.UI,
        label: 'Components',
        icon: <Layers2Icon className="size-4!" />,
        description: 'Re-usable components',
        className: 'text-green-500 bg-green-500/10 border-green-500/20',
    },
]

export function ModulePicker() {
    const selectedModule = useModulePicker()

    return (
        <div className="pt-6 pb-2 px-6 z-[2] relative">
            <PopoverTrigger>
                <Button variant="unstyled" className="text-start w-full transition-colors flex items-center gap-2 p-0">
                    <ModuleItem module={selectedModule} />
                    <ChevronDown className="ml-auto w-4 h-4 text-neutral-500" />
                </Button>
                <Popover offset={8} className="rounded-[12px]">
                    <PopoverDialog className="p-1 w-(--trigger-width)">
                        {({ close }) => (
                            <div className="flex flex-col gap-1">
                                {modules.map(item => {
                                    const isSelected = item.value === selectedModule.value

                                    return (
                                        <Link
                                            onClick={close}
                                            key={item.value}
                                            href={`/docs/${item.value}`}
                                            className={cn(
                                                'text-start w-full flex items-center gap-2 p-1 hover:bg-neutral-400/5 rounded-md',
                                                isSelected && 'bg-neutral-400/10!',
                                            )}
                                        >
                                            <ModuleItem module={item} />
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </PopoverDialog>
                </Popover>
            </PopoverTrigger>
        </div>
    )
}

function ModuleItem({ module }: { module: Module }) {
    return (
        <>
            <div className={cn('grid place-items-center w-9 h-9 rounded-sm bg-neutral-400/10', module.className)}>
                {module.icon}
            </div>
            <div>
                <p className="text-sm font-semibold">{module.label}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{module.description}</p>
            </div>
        </>
    )
}

export function useModulePicker() {
    const pathname = usePathname()
    const selectedModule = modules.find(item => pathname.startsWith(`/docs/${item.value}`)) || modules[0]

    return selectedModule
}
