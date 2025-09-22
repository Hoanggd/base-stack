"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState as TanstackSortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";
import { z } from "@workspace/ui/lib/zod";

export const DataTableSortingSchema = z.object({
  sortBy: z.string(),
  sortDirection: z.enum(["asc", "desc"]),
});

export type DataTableSorting = z.infer<typeof DataTableSortingSchema>;
export interface DataTableProps<TData, TValue> {
  /**
   * The columns to display in the table.
   */
  columns: ColumnDef<TData, TValue>[];
  /**
   * The data to display in the table.
   */
  data: TData[];
  /**
   * The class name for the container of the table. This is useful for setting height or width.
   */
  containerClassName?: string;

  /**
   * The sorting to display in the table.
   */
  sorting?: DataTableSorting | null;
  /**
   * The function to set the sorting in the table.
   */
  setSorting?: (sorting: DataTableSorting | null) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  containerClassName,
  sorting: controlledSorting,
  setSorting: controlledSetSorting,
}: DataTableProps<TData, TValue>) {
  // sorting
  const [uncontrolledSorting, setUncontrolledSorting] =
    React.useState<DataTableSorting | null>(null);
  const sorting = controlledSorting ?? uncontrolledSorting;
  const setSorting = controlledSetSorting ?? setUncontrolledSorting;

  // table config
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      const oldTanstackSorting: TanstackSortingState = sorting
        ? [
            {
              id: sorting?.sortBy,
              desc: sorting?.sortDirection === "desc",
            },
          ]
        : [];

      const newTanstackSorting =
        typeof updater === "function" ? updater(oldTanstackSorting) : updater;

      if (newTanstackSorting[0]?.id) {
        setSorting({
          sortBy: newTanstackSorting[0].id,
          sortDirection: newTanstackSorting[0].desc ? "desc" : "asc",
        });
      } else {
        setSorting(null);
      }
    },
    state: {
      sorting: sorting
        ? [
            {
              id: sorting?.sortBy,
              desc: sorting?.sortDirection === "desc",
            },
          ]
        : [],
    },
    manualSorting: true, // IMPORTANT: Always set manualSorting to true
  });

  return (
    <Table containerClassName={containerClassName}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <div className="inline-block ml-0.5 -translate-y-px">
                        {{
                          asc: <ArrowUpIcon className="inline-block size-4!" />,
                          desc: (
                            <ArrowDownIcon className="inline-block size-4!" />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <ArrowUpIcon className="inline-block size-4! opacity-0" />
                        )}
                      </div>
                    </div>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
