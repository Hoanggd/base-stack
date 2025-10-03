'use client'

import { Pagination, PaginationPageSizeSelector } from '@workspace/ui/components/Pagination'

export function PaginationWithPageSelector() {
    return (
        <div className="flex items-center justify-between gap-2 w-full border rounded-lg p-4">
            <PaginationPageSizeSelector />
            <Pagination pageCount={10} />
        </div>
    )
}
