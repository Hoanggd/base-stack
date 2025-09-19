"use client";

import {
  Pagination,
  PaginationPageSelector,
} from "@workspace/ui/components/pagination";

export function PaginationWithPageSelector() {
  return (
    <div className="flex items-center justify-between gap-2 w-full border rounded-lg p-4">
      <PaginationPageSelector />
      <Pagination pageCount={10} />
    </div>
  );
}
