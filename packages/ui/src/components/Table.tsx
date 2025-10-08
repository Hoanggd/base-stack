'use client'

import * as React from 'react'

import { cn } from '@workspace/ui/lib/utils'

interface TableProps extends React.ComponentProps<'table'> {
    /**
     * The class name for the container of the table. This is useful for setting height or width.
     */
    containerClassName?: string
}

function Table({ className, containerClassName, ...props }: TableProps) {
    const tableContainerRef = React.useRef<HTMLDivElement>(null)
    const tableRef = React.useRef<HTMLTableElement>(null)

    const calculateScrollPosition = () => {
        const container = tableContainerRef.current
        const table = tableRef.current

        if (!container) return

        const { scrollLeft, scrollWidth, clientWidth } = container
        const isAtHorizontalStart = scrollLeft === 0
        const isAtHorizontalEnd = Math.abs(scrollLeft + clientWidth - scrollWidth) < 1

        if (!table) return

        table.setAttribute('data-at-start', isAtHorizontalStart.toString())
        table.setAttribute('data-at-end', isAtHorizontalEnd.toString())
    }

    React.useEffect(() => {
        calculateScrollPosition()
    }, [])

    return (
        <div className="relative grid bg-background-secondary rounded-md overflow-hidden border">
            <div
                ref={tableContainerRef}
                data-slot="table-container"
                className={cn('w-full overflow-x-auto', containerClassName)}
                onScroll={calculateScrollPosition}
            >
                <table
                    ref={tableRef}
                    data-slot="table"
                    className={cn('group w-full caption-bottom text-sm', className)}
                    {...props}
                />
            </div>
        </div>
    )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
    return <thead data-slot="table-header" className={cn('sticky top-0 z-[2]', className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
    return (
        <tbody
            data-slot="table-body"
            className={cn(
                '[&_tr:nth-child(odd)]:bg-background-secondary [&_tr:nth-child(even)]:bg-background-tertiary',
                className,
            )}
            {...props}
        />
    )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn('bg-neutral-400/10 border-t font-medium sticky bottom-0', className)}
            {...props}
        />
    )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
    return (
        <tr
            data-slot="table-row"
            className={cn('data-[state=selected]:bg-blue-200! dark:data-[state=selected]:bg-blue-900!', className)}
            {...props}
        />
    )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                'px-3 text-foreground bg-background-tertiary h-10 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className,
            )}
            {...props}
        />
    )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                'p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] truncate bg-inherit',
                className,
            )}
            {...props}
        />
    )
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
    return (
        <caption data-slot="table-caption" className={cn('text-muted-foreground my-4 text-sm', className)} {...props} />
    )
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
