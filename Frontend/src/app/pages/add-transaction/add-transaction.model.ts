export interface Transaction {
     amount: number;
  category: string;
  description: string;
  date: string; // or Date
  type: 'INCOME' | 'EXPENSE';
  accountId: number;
 
}