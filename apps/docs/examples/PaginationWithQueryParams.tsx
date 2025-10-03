'use client'

import { Pagination } from '@workspace/ui/components/Pagination'
import { useQueryState, parseAsInteger } from 'nuqs'
import { Suspense } from 'react'

/**
 * nuqs uses useSearchParams under the hood, and in Next.js
 * useSearchParams must be used within a <Suspense> boundary.
 * That's why I split this into two components.
 */

function Component() {
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0))

    return <Pagination pageCount={10} value={page} onChange={setPage} />
}

export function PaginationWithQueryParams() {
    return (
        <Suspense fallback={<div className="h-8" />}>
            <Component />
        </Suspense>
    )
}
