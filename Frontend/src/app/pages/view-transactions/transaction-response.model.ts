export interface TransactionResponse {
    id: number;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: 'INCOME' | 'EXPENSE';
    bankName: string;
    accountId: number
}