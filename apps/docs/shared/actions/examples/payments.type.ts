export interface Payment {
    id: string
    amount: string
    status: 'pending' | 'processing' | 'success' | 'failed'
    email: string
    paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer'
    transactionDate: string
    paymentReference: string
}
