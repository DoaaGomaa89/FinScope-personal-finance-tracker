export interface MonthlySummaryDto {
  month: string;           // Format: "2025-04"
  totalAmount: number;
  type: 'INCOME' | 'EXPENSE'; // Only these two values
}