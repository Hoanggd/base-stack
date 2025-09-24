'use client'

import { Pagination } from '@workspace/ui/components/Pagination'
import { useQueryState, parseAsInteger } from 'nuqs'

export function PaginationWithQueryParams() {
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0))

    return <Pagination pageCount={10} value={page} onChange={setPage} />
}
