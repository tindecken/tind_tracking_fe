import type { MustPayModel } from './MustPayModel';

export interface AddTransactionForMustPayRequestModel {
  day: string;
  amount: number;
  note?: string;
  isPaybyCash: boolean;
  mustPay: MustPayModel;
}
