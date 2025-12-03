import type { MustPayModel } from './MustPayModel';

export interface AddTransactionForMustPayRequestModel {
  day: string;
  amount: number;
  mustPay: MustPayModel;
}
