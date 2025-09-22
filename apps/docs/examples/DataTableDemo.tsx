import { DataTable } from "@workspace/ui/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { faker } from "@faker-js/faker";

export interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  paymentMethod: "credit_card" | "debit_card" | "paypal" | "bank_transfer";
  transactionDate: string;
  paymentReference: string;
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
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

function getData(): Payment[] {
  // Generate 100 fake payment records using Faker.js
  return Array.from({ length: 100 }, () => {
    const statuses: ("pending" | "processing" | "success" | "failed")[] = [
      "pending",
      "processing",
      "success",
      "failed",
    ];

    const paymentMethods: (
      | "credit_card"
      | "debit_card"
      | "paypal"
      | "bank_transfer"
    )[] = ["credit_card", "debit_card", "paypal", "bank_transfer"];

    return {
      id: faker.string.uuid(),
      amount: faker.number.int({ min: 10, max: 1000 }),
      status: faker.helpers.arrayElement(statuses),
      email: faker.internet.email(),
      paymentMethod: faker.helpers.arrayElement(paymentMethods),
      transactionDate: faker.date
        .recent({ days: 30 })
        .toISOString()
        .split("T")[0],
      paymentReference: `PAY-${faker.string.alphanumeric(6).toUpperCase()}`,
    };
  });
}
const data = getData();

export function DataTableDemo() {
  return (
    <DataTable columns={columns} data={data} containerClassName="h-[450px]" />
  );
}
