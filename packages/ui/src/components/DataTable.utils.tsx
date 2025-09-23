import { Column, ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { z } from '@workspace/ui/lib/zod';
import { cn } from '@workspace/ui/lib/utils';

function getCheckboxColumnDef<T>(): ColumnDef<T> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        isSelected={table.getIsAllRowsSelected()}
        isIndeterminate={table.getIsSomeRowsSelected()}
        onChange={(isSelected) => {
          table.toggleAllRowsSelected(isSelected);
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        isSelected={row.getIsSelected()}
        isDisabled={!row.getCanSelect()}
        isIndeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 42,
    enableSorting: false,
  };
}

function getCommonPinningStyles<T>(column: Column<T>): string {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return cn(
    isPinned === 'left' && 'sticky left-0',
    isPinned === 'right' && 'sticky right-0',
    isPinned ? 'z-[1]' : 'z-0',
    isLastLeftPinnedColumn &&
      'shadow-[-6px_0_6px_-6px_oklch(0_0_0_/_0.1)_inset] dark:shadow-[-6px_0_6px_-6px_oklch(0_0_0_/_0.3)_inset]',
    isFirstRightPinnedColumn &&
      'shadow-[6px_0_6px_-6px_oklch(0_0_0_/_0.1)_inset] dark:shadow-[6px_0_6px_-6px_oklch(0_0_0_/_0.3)_inset]'
  );
}

const DataTableSortingSchema = z.object({
  sortBy: z.string(),
  sortDirection: z.enum(['asc', 'desc']),
});

type DataTableSorting = z.infer<typeof DataTableSortingSchema>;

export { getCheckboxColumnDef, getCommonPinningStyles, DataTableSortingSchema };
export type { DataTableSorting };
