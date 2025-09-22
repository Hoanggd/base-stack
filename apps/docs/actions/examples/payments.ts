"use server";

import { paymentData } from "./payments.data";

export interface Payment {
  id: string;
  amount: string;
  status: string;
  email: string;
  paymentMethod: string;
  transactionDate: string;
  paymentReference: string;
}

interface GetPaymentsParams {
  sortBy: string;
  sortDirection: "asc" | "desc";
}

export async function getPayments(
  params?: GetPaymentsParams | null
): Promise<Array<Payment>> {
  await new Promise((resolve) => setTimeout(resolve, 500));


  const sortedData = sortByString(
    paymentData,
    params?.sortBy || "",
    params?.sortDirection
  ) as Array<Payment>;

  return sortedData;
}

function sortByString(
  arr: Array<Record<any, any>>,
  field: string,
  order = "asc"
) {
  if (!field) {
    return arr;
  }

  return [...arr].sort((a, b) => {
    return order === "asc"
      ? a[field].localeCompare(b[field])
      : b[field].localeCompare(a[field]);
  });
}
