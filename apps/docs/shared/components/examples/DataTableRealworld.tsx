'use client'

import React from 'react'
import { getPayments, Payment } from '@/shared/actions/examples/payments'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/Button'
import { DataTable, DataTableSorting } from '@workspace/ui/components/DataTable'
import { Pagination, PaginationPageSizeSelector } from '@workspace/ui/components/Pagination'
import { BsSearchField } from '@workspace/ui/components/Searchfield'
import { BsSelect } from '@workspace/ui/components/Select'
import { CreditCardIcon, EditIcon, TrashIcon, XIcon } from 'lucide-react'

import { cn } from '@workspace/ui/lib/utils'
import { toast } from '@workspace/ui/components/Sonner'
import { confirm } from '@workspace/ui/components/ConfirmDialog'
import { useNProgress } from '@workspace/ui/components/NProgress'

const columnHelper = createColumnHelper<Payment>()

const methodOptions = [
    { id: 'debit_card', name: 'Debit Card', className: 'text-green-500 bg-green-500/10' },
    { id: 'credit_card', name: 'Credit Card', className: 'text-blue-500 bg-blue-500/10' },
    { id: 'bank_transfer', name: 'Bank Transfer', className: 'text-yellow-500 bg-yellow-500/10' },
    { id: 'paypal', name: 'Paypal', className: 'text-purple-500 bg-purple-500/10' },
]

export const columns = [
    columnHelper.accessor('paymentMethod', {
        header: 'Payment Method',
        cell: ({ getValue }) => {
            const value = getValue()
            const method = methodOptions.find(option => option.id === value)
            return (
                <div className="flex items-center gap-2">
                    <div className={cn(method?.className, 'rounded-sm p-1.5')}>
                        <CreditCardIcon className="size-4" />
                    </div>
                    <span className="font-medium">{method?.name}</span>
                </div>
            )
        },
    }),
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
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: () => (
            <div className="space-x-1">
                <Button variant="ghost" size="icon" aria-label='edit'>
                    <EditIcon className="text-primary-foreground" />
                </Button>
                <Button variant="ghost" size="icon" aria-label='delete'>
                    <TrashIcon className="text-destructive-foreground" />
                </Button>
            </div>
        ),
        size: 100,
        enableSorting: false,
        meta: {
            className: 'text-center',
        },
    }),
]

export function DataTableRealworld() {
    const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({
        '34caaea9-44ee-4519-a6e8-4061f916d4fe': true,
    })
    const selectedCount = Object.keys(rowSelection).length

    const [search, setSearch] = React.useState('')
    const [sorting, setSorting] = React.useState<DataTableSorting | null>(null)
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(5)
    const [paymentMethod, setPaymentMethod] = React.useState('')
    const isFiltering = search || paymentMethod

    const payments = useQuery({
        queryKey: ['payments', sorting, page, pageSize, paymentMethod, search],
        queryFn: () => getPayments({ ...sorting, page, pageSize, paymentMethod, search }),
        placeholderData: keepPreviousData,
    })

    const handleClearFilters = () => {
        setSearch('')
        setPaymentMethod('')
        setPage(1)
    }

    const handleDeleteSelected = () => {
        confirm({
            variant: 'destructive',
            title: 'Delete Users',
            description: 'Are you sure you want to delete these users?',
            action: {
                label: 'Delete',
                onClick: () => {
                    toast.success({
                        title: `Users Deleted Successfully`,
                        description: `Deleted ${selectedCount} selected users`,
                    })
                },
            },
        })
    }

    useNProgress({ isFetching: payments.isFetching })

    return (
        <div className="w-full space-y-3">
            <div className="flex gap-2">
                <BsSearchField
                    value={search}
                    onChange={value => {
                        setSearch(value)
                        setPage(1)
                    }}
                    containerClassName="max-sm:flex-1"
                />
                <BsSelect
                    value={paymentMethod}
                    onChange={value => {
                        setPaymentMethod(String(value))
                        setPage(1)
                    }}
                    className="w-[155px] max-sm:hidden"
                    placeholder="Payment Method"
                    options={methodOptions}
                />
                {isFiltering && (
                    <Button className="max-sm:hidden" variant="outline" onClick={handleClearFilters}>
                        <XIcon />
                        Clear
                    </Button>
                )}

                {!!selectedCount && (
                    <Button variant="destructive" className="ml-auto max-sm:hidden" onClick={handleDeleteSelected}>
                        Delete Selected
                    </Button>
                )}
            </div>
            <DataTable
                enableSorting
                enableRowSelection
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                containerClassName="h-[335px]"
                sorting={sorting}
                setSorting={setSorting}
                columns={columns}
                data={payments.data?.items ?? []}
                isLoading={payments.isLoading}
            />
            <div className="flex gap-4 justify-between">
                <PaginationPageSizeSelector
                    value={pageSize}
                    onChange={value => {
                        setPageSize(value)
                        setPage(1)
                    }}
                />
                <Pagination value={page} onChange={setPage} pageCount={payments.data?.meta.totalPages ?? 1} />
            </div>
        </div>
    )
}
