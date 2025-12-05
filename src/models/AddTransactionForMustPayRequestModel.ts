import type { MustPayModel } from './MustPayModel';

export interface AddTransactionForMustPayRequestModel {
  day: string;
  amount: number;
  isPaybyCash: boolean;
  mustPay: MustPayModel;
}
