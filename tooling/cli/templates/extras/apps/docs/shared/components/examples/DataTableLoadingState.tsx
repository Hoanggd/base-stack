'use client'

import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@workspace/ui/components/DataTable'
import { Button } from '@workspace/ui/components/Button'

interface Product {
    id: string
    name: string
    category: string
    price: number
    stock: number
}

const columnHelper = createColumnHelper<Product>()

const data: Product[] = [
    {
        id: '1',
        name: 'Laptop Pro',
        category: 'Electronics',
        price: 1299.99,
        stock: 15,
    },
    {
        id: '2',
        name: 'Wireless Mouse',
        category: 'Accessories',
        price: 29.99,
        stock: 50,
    },
    {
        id: '3',
        name: 'Mechanical Keyboard',
        category: 'Accessories',
        price: 149.99,
        stock: 25,
    },
]

const columns = [
    columnHelper.accessor('name', {
        header: 'Product Name',
    }),
    columnHelper.accessor('category', {
        header: 'Category',
    }),
    columnHelper.accessor('price', {
        header: 'Price',
        cell: info => `$${info.getValue().toFixed(2)}`,
        meta: {
            className: 'text-right',
        },
    }),
]

export function DataTableLoadingState() {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleLoadData = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleLoadData} isDisabled={isLoading}>
                    Simulate Initial Load
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={isLoading ? [] : data}
                isLoading={isLoading}
                containerClassName="h-[180px]"
            />
        </div>
    )
}
