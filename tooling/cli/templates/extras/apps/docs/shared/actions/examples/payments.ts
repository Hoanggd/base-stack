'use server'

import { paymentData } from './payments.data'

export interface Payment {
    id: string
    amount: string
    status: string
    email: string
    paymentMethod: 'credit_card' | 'debit_card' | 'bank_transfer' | 'paypal'
    transactionDate: string
    paymentReference: string
}

interface GetPaymentsParams {
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
    page?: number
    pageSize?: number
    paymentMethod?: string
    search?: string
}

export async function getPayments(params?: GetPaymentsParams | null): Promise<{
    items: Array<Payment>
    meta: {
        page: number
        pageSize: number
        totalPages: number
    }
}> {
    await new Promise(resolve => setTimeout(resolve, 200))

    let items = sortByString(paymentData, params?.sortBy || '', params?.sortDirection) as Array<Payment>

    // filter
    if (params?.paymentMethod) {
        items = items.filter(payment => payment.paymentMethod.includes(params?.paymentMethod || ''))
    }

    // search
    if (params?.search) {
        items = items.filter(payment => payment.email?.toLowerCase().includes(params?.search?.toLowerCase() || ''))
    }

    const totalPages = Math.ceil(items.length / (params?.pageSize || 10))

    // paginate
    items = items.slice(
        ((params?.page || 1) - 1) * (params?.pageSize || 10),
        ((params?.page || 1) - 1) * (params?.pageSize || 10) + (params?.pageSize || 10),
    )

    return {
        items,
        meta: {
            page: params?.page || 1,
            pageSize: params?.pageSize || 10,
            totalPages,
        },
    }
}

function sortByString(arr: Array<Record<any, any>>, field: string, order = 'asc') {
    if (!field) {
        return arr
    }

    return [...arr].sort((a, b) => {
        return order === 'asc' ? a[field]?.localeCompare(b[field]) : b[field]?.localeCompare(a[field])
    })
}
