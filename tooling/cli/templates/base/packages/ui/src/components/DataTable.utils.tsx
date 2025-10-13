import { Column, ColumnDef } from '@tanstack/react-table'
import { Checkbox } from './Checkbox'
import { z } from 'zod'
import { cn } from '@workspace/ui/lib/utils'

function getCheckboxColumnDef<T>(): ColumnDef<T> {
    return {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                aria-label="select all"
                isSelected={table.getIsAllRowsSelected()}
                isIndeterminate={table.getIsSomePageRowsSelected()}
                onChange={isSelected => {
                    table.toggleAllRowsSelected(isSelected)
                }}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                aria-label="select row"
                isSelected={row.getIsSelected()}
                isDisabled={!row.getCanSelect()}
                isIndeterminate={row.getIsSomeSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
        size: 42,
        enableSorting: false,
    }
}

function getCommonPinningStyles<T>(column: Column<T>): string {
    const isPinned = column.getIsPinned()
    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')

    return cn(
        isPinned === 'left' && 'sticky left-0',
        isPinned === 'right' && 'sticky right-0',
        isPinned ? 'z-[1]' : 'z-0',
        isLastLeftPinnedColumn &&
            'group-data-[at-start="false"]:shadow-[-6px_0_6px_-6px_oklch(0_0_0_/_0.15)_inset] dark:group-data-[at-start="false"]:shadow-[-6px_0_6px_-6px_oklch(0_0_0_/_0.3)_inset]',
        isFirstRightPinnedColumn &&
            'group-data-[at-end="false"]:shadow-[6px_0_6px_-6px_oklch(0_0_0_/_0.15)_inset] dark:group-data-[at-end="false"]:shadow-[6px_0_6px_-6px_oklch(0_0_0_/_0.3)_inset]',
    )
}

const DataTableSortingSchema = z.object({
    sortBy: z.string(),
    sortDirection: z.enum(['asc', 'desc']),
})

type DataTableSorting = z.infer<typeof DataTableSortingSchema>

export { getCheckboxColumnDef, getCommonPinningStyles, DataTableSortingSchema }
export type { DataTableSorting }
