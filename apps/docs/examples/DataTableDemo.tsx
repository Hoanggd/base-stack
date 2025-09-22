"use client";

import {
  DataTable,
  DataTableSortingSchema,
} from "@workspace/ui/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { parseAsJson, useQueryState } from "nuqs";
import { getPayments, Payment } from "@/actions/examples/payments";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: "Email",
    size: 300,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
  },
  {
    accessorKey: "paymentReference",
    header: "Payment Reference",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = useQueryState(
    "sorting",
    parseAsJson(DataTableSortingSchema)
  );

  const payments = useQuery({
    queryKey: ["payments", sorting || {}],
    queryFn: () => getPayments(sorting),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="w-full">
      <DataTable
        enableSorting
        containerClassName="h-[450px]"
        sorting={sorting}
        setSorting={setSorting}
        columns={columns}
        data={payments.data ?? []}
        isLoading={payments.isLoading}
        isFetching={payments.isFetching}
      />
    </div>
  );
}
