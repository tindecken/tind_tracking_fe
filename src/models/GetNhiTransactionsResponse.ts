export interface GetNhiTransactionsResponse {
  transactions: {
    name: string;
    amount: number;
  }[];
  total: number;
}
