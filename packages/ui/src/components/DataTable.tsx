"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableOptions,
  TableState,
  SortingState as TanstackSortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Spinner } from "@workspace/ui/components/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/Table";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, FileSearch } from "lucide-react";
import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
import {
  DataTableSorting,
  DataTableSortingSchema,
  getCheckboxColumnDef,
  getCommonPinningStyles,
} from "@workspace/ui/components/DataTable.utils";

interface Identifiable {
  id: string | number;
}

interface DataTableProps<TData extends Identifiable, TValue> {
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
   * Whether to enable row selection in the table.
   */
  enableRowSelection?: boolean;

  /**
   * The row selection in the table.
   */
  rowSelection?: TableState["rowSelection"];

  /**
   * The function to set the row selection in the table.
   */
  setRowSelection?: TableOptions<TData>["onRowSelectionChange"];

  /**
   * Indicates if the table is currently loading for the first time.
   */
  isLoading?: boolean;

  /**
   * Indicates if the table is being updated with new data after the initial load.
   */
  isFetching?: boolean;
}

function DataTable<TData extends Identifiable, TValue>({
  data,
  columns,
  containerClassName,
  enableSorting = false,
  sorting: controlledSorting,
  setSorting: controlledSetSorting,
  enableRowSelection = false,
  rowSelection,
  setRowSelection,
  isLoading,
  isFetching,
}: DataTableProps<TData, TValue>) {
  // sorting
  const [uncontrolledSorting, setUncontrolledSorting] =
    React.useState<DataTableSorting | null>(null);
  const sorting = controlledSorting ?? uncontrolledSorting;
  const setSorting = controlledSetSorting ?? setUncontrolledSorting;

  const table = useReactTable({
    // core settings
    data,
    columns: enableRowSelection
      ? [getCheckboxColumnDef<TData>(), ...columns]
      : columns,

    // row selection settings
    enableRowSelection,
    ...(setRowSelection ? { onRowSelectionChange: setRowSelection } : {}),

    // sorting settings - IMPORTANT: Always set manualSorting to true
    manualSorting: true,
    enableSorting: enableSorting,
    getCoreRowModel: getCoreRowModel(),
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

    // state settings
    state: {
      ...(rowSelection ? { rowSelection } : {}),
      sorting: sorting
        ? [
            {
              id: sorting?.sortBy,
              desc: sorting?.sortDirection === "desc",
            },
          ]
        : [],
    },

    // additional settings
    getRowId: (row) => String(row.id),
    defaultColumn: {
      size: 180,
    },
    initialState: {
      columnPinning: {
        left: ["select"],
        right: ["actions"],
      },
    },
  });

  return (
    <Table
      containerClassName={cn("relative", containerClassName)}
      progressBarSlot={<ProgressBar isFetching={!!isFetching && !isLoading} />}
    >
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
                  className={getCommonPinningStyles(header.column)}
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
                        header.getContext(),
                      )}
                      {header.column.getCanSort() && (
                        <div className="inline-block ml-0.5 -translate-y-px">
                          {{
                            asc: (
                              <ArrowUpIcon className="inline-block size-4!" />
                            ),
                            desc: (
                              <ArrowDownIcon className="inline-block size-4!" />
                            ),
                          }[header.column.getIsSorted() as string] ?? (
                            <ArrowUpIcon className="inline-block size-4! opacity-0" />
                          )}
                        </div>
                      )}
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
                <TableCell
                  key={cell.id}
                  style={{
                    minWidth: cell.column.columnDef.size,
                    maxWidth: cell.column.columnDef.size,
                  }}
                  className={getCommonPinningStyles(cell.column)}
                  title={String(cell.getValue() || "")}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <tr>
            <td className="flex flex-col items-center justify-center gap-2 absolute inset-0 text-muted-foreground">
              {isLoading && <Spinner />}
              {!isLoading && (
                <>
                  <FileSearch className="size-10 stroke-1" />
                  <span>No results.</span>
                </>
              )}
            </td>
          </tr>
        )}
      </TableBody>
    </Table>
  );
}

interface ProgressBarProps {
  isFetching: boolean;
}

function ProgressBar({ isFetching }: ProgressBarProps) {
  const progressBarId = React.useId();

  React.useEffect(() => {
    NProgress.configure({
      parent: `#${progressBarId}`,
      showSpinner: false,
      trickleSpeed: 150,
      template:
        '<div class="bar bg-primary!" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    });

    if (isFetching) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);

  return (
    <div className="w-full absolute top-0 left-0">
      <div className="h-1 block" id={progressBarId} />
    </div>
  );
}

export { DataTable, DataTableSortingSchema };
export type { DataTableProps, DataTableSorting };
