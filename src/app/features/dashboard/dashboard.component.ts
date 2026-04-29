import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AnalyticsService } from '@core/analytics/analytics.service';
import { AuthService } from '@core/auth/auth.service';

interface AccountSummary {
  accountId: string;
  nickname: string;
  type: string;
  mask: string;
  balance: number;
}

@Component({
  selector: 'cv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalBalance = 0;
  accounts$: Observable<AccountSummary[]> = of([]);
  customerName = 'Sarah';

  // TODO: replace mock data with AccountsService once integration is finalized
  private mockAccounts: AccountSummary[] = [
    { accountId: 'acct_001', nickname: 'Everyday Checking', type: 'Checking', mask: '4421', balance: 4250.18 },
    { accountId: 'acct_002', nickname: 'Emergency Savings', type: 'Savings', mask: '8800', balance: 18500.00 },
    { accountId: 'acct_003', nickname: 'Travel Rewards', type: 'Credit Card', mask: '1102', balance: -1245.62 }
  ];

  constructor(private analytics: AnalyticsService, private auth: AuthService) {}

  ngOnInit(): void {
    this.analytics.trackEvent('dashboard.view');
    this.accounts$ = of(this.mockAccounts);
    this.totalBalance = this.mockAccounts.reduce((sum, a) => sum + a.balance, 0);
  }
}
