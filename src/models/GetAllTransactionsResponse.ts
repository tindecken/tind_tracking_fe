import type { TransactionModel } from './TransactionModel';

export interface GetAllTransactionsResponse {
  transactions: TransactionModel[];
  total: number;
}
