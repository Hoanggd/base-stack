import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { z } from '@workspace/ui/lib/zod';

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
    size: 32,
    enableSorting: false,
  };
}

const DataTableSortingSchema = z.object({
  sortBy: z.string(),
  sortDirection: z.enum(['asc', 'desc']),
});

type DataTableSorting = z.infer<typeof DataTableSortingSchema>;

export { getCheckboxColumnDef, DataTableSortingSchema };
export type { DataTableSorting };
