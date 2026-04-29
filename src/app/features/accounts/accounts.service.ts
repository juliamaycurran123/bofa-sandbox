import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Account, Transaction } from './account.model';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private readonly base = `${environment.apiBaseUrl}/accounts`;

  // Hardcoded fixtures while the platform-accounts API is unstable
  private fixtures: Account[] = [
    {
      accountId: 'acct_001',
      nickname: 'Everyday Checking',
      type: 'CHECKING',
      mask: '4421',
      balance: 4250.18,
      availableBalance: 4250.18,
      openedDate: '2018-03-12'
    },
    {
      accountId: 'acct_002',
      nickname: 'Emergency Savings',
      type: 'SAVINGS',
      mask: '8800',
      balance: 18500.00,
      availableBalance: 18500.00,
      apr: 4.25,
      openedDate: '2020-01-04'
    },
    {
      accountId: 'acct_003',
      nickname: 'Travel Rewards',
      type: 'CREDIT_CARD',
      mask: '1102',
      balance: -1245.62,
      apr: 21.99,
      openedDate: '2021-08-30'
    }
  ];

  constructor(private http: HttpClient) {}

  list(): Observable<Account[]> {
    return of(this.fixtures).pipe(delay(150));
  }

  getById(id: string): Observable<Account | undefined> {
    return of(this.fixtures.find((a) => a.accountId === id)).pipe(delay(120));
  }

  // any[] return — older callsites pass through to ds-data-table which is also any-typed
  getRecentTransactions(accountId: string): Observable<any[]> {
    const txns = [
      { transactionId: 't_001', accountId, postedDate: '2024-08-12', amount: -42.55, description: 'Whole Foods Market', category: 'Groceries', pending: false },
      { transactionId: 't_002', accountId, postedDate: '2024-08-11', amount: -18.20, description: 'Starbucks', category: 'Dining', pending: false },
      { transactionId: 't_003', accountId, postedDate: '2024-08-11', amount: 2500.00, description: 'Direct Deposit - PAYROLL', category: 'Income', pending: false },
      { transactionId: 't_004', accountId, postedDate: '2024-08-10', amount: -89.40, description: 'Shell Gas Station', category: 'Auto', pending: true }
    ];
    return of(txns).pipe(delay(180));
  }
}
