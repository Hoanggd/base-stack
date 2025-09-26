'use client'

import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@workspace/ui/components/DataTable'
import { cn } from '@workspace/ui/lib/utils'

interface User {
    id: string
    name: string
    email: string
    balance: string
}

const columnHelper = createColumnHelper<User>()

const data: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        balance: '$1000',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        balance: '$2000',
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        balance: '$3000',
    },
]

const columns = [
    columnHelper.accessor('name', {
        header: 'Name',
    }),
    columnHelper.accessor('email', {
        header: 'Email',
    }),
    columnHelper.accessor('balance', {
        header: 'Balance',
        meta: {
            className: 'text-right',
        }
    }),
]

export function DataTableColumnAlignment() {
    return (
        <div className="w-full">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
