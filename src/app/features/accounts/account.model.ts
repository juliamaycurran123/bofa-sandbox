export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'MORTGAGE' | 'AUTO_LOAN';

export interface Account {
  accountId: string;
  nickname: string;
  type: AccountType;
  mask: string;
  balance: number;
  availableBalance?: number;
  apr?: number;
  openedDate: string;
}

export interface Transaction {
  transactionId: string;
  accountId: string;
  postedDate: string;
  amount: number;
  description: string;
  category: string;
  pending: boolean;
}
