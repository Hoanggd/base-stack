'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@workspace/ui/components/DataTable'

interface Payment {
    id: string
    email: string
    transactionDate: string
    paymentReference: string
}

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

const payments: Array<Payment> = [
    {
        id: '1',
        email: 'john@doe.com',
        transactionDate: '2021-01-01',
        paymentReference: 'PAY-00123',
    },
    {
        id: '2',
        email: 'jane@smith.com',
        transactionDate: '2021-01-02',
        paymentReference: 'PAY-00456',
    },
    {
        id: '3',
        email: 'bob@johnson.com',
        transactionDate: '2021-01-03',
        paymentReference: 'PAY-00789',
    },
]

export function DataTableDemo() {
    return (
        <div className="w-full">
            <DataTable columns={columns} data={payments} />
        </div>
    )
}
