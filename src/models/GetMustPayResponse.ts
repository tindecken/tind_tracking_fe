export interface MustPayItem {
  cell: string;
  name: string;
  amount: number;
}

export type GetMustPayResponse = MustPayItem[];
