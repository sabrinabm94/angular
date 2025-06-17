export interface Expense {
  id?: string;
  condominiumId: string;
  name: string;
  amount: number;
  date: string; // ISO format
  description?: string;
  invoiceUrl?: string;
  receiptUrl?: string;
  createdAt: string;
}
