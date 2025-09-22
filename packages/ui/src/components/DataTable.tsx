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
import { ArrowDownIcon, ArrowUpIcon, FileSearch } from "lucide-react";
import React from "react";
import { z } from "@workspace/ui/lib/zod";
import { cn } from "../lib/utils";
import { Skeleton } from "./skeleton";

export const DataTableSortingSchema = z.object({
  sortBy: z.string(),
  sortDirection: z.enum(["asc", "desc"]),
});

const SKELETON_DATA = Array.from({ length: 10 }).map((item) => ({})) as any;

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
   * Whether to enable sorting in the table.
   */
  enableSorting?: boolean;

  /**
   * The sorting to display in the table.
   */
  sorting?: DataTableSorting | null;

  /**
   * The function to set the sorting in the table.
   */
  setSorting?: (sorting: DataTableSorting | null) => void;

  /**
   * Indicates if the table is currently loading for the first time.
   */
  isLoading?: boolean;

  /**
   * Indicates if the table is being updated with new data after the initial load.
   */
  isFetching?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  containerClassName,
  enableSorting = false,
  sorting: controlledSorting,
  setSorting: controlledSetSorting,
  isLoading,
  isFetching,
}: DataTableProps<TData, TValue>) {
  // sorting
  const [uncontrolledSorting, setUncontrolledSorting] =
    React.useState<DataTableSorting | null>(null);
  const sorting = controlledSorting ?? uncontrolledSorting;
  const setSorting = controlledSetSorting ?? setUncontrolledSorting;

  // table config
  const table = useReactTable({
    columns,
    data: isLoading ? SKELETON_DATA : data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: enableSorting,
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
    defaultColumn: {
      size: 180,
    },
  });

  return (
    <Table containerClassName={cn("relative", containerClassName)}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  style={{
                    minWidth: header.column.columnDef.size,
                    maxWidth: header.column.columnDef.size,
                  }}
                >
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
      <TableBody className={cn(isFetching && "opacity-70")}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{
                    minWidth: cell.column.columnDef.size,
                    maxWidth: cell.column.columnDef.size,
                  }}
                  title={String(cell.getValue() || "")}
                >
                  {isLoading ? (
                    <Skeleton className="h-5" />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <tr>
            <td className="flex flex-col items-center justify-center gap-2 absolute inset-0 text-muted-foreground">
              <FileSearch className="size-10 stroke-1" />
              <span>No results.</span>
            </td>
          </tr>
        )}
      </TableBody>
    </Table>
  );
}
