'use client'

import { getPayments, Payment } from '@/shared/actions/examples/payments'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable, type DataTableSorting } from '@workspace/ui/components/DataTable'
import { useNProgress } from '@workspace/ui/components/NProgress'
import React from 'react'

const columnHelper = createColumnHelper<Payment>()

export const columns = [
    columnHelper.accessor('email', {
        header: 'Email',
        size: 270,
    }),
    columnHelper.accessor('transactionDate', {
        header: 'Transaction Date',
    }),
    columnHelper.accessor('paymentReference', {
        header: 'Payment Reference',
    }),
]

export function DataTableSorting() {
    const [sorting, setSorting] = React.useState<DataTableSorting | null>(null)

    const payments = useQuery({
        queryKey: ['payments', sorting],
        queryFn: () => getPayments(sorting),
        placeholderData: keepPreviousData,
    })

    useNProgress({
        isFetching: payments.isFetching,
    })

    return (
        <div className="w-full space-y-3">
            <DataTable
                enableSorting
                sorting={sorting}
                setSorting={setSorting}
                columns={columns}
                data={payments.data?.items ?? []}
                isLoading={payments.isLoading}
                containerClassName="h-[310px]"
            />
        </div>
    )
}
