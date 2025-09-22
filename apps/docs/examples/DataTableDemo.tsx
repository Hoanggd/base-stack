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
    <DataTable
      sorting={sorting}
      setSorting={setSorting}
      columns={columns}
      data={payments.data ?? []}
      containerClassName="h-[450px]"
    />
  );
}
