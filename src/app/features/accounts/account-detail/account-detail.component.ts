import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Account } from '../account.model';
import { AccountsService } from '../accounts.service';
import { DsColumnDef } from '@design-system/components/ds-data-table/ds-data-table.component';
import { AnalyticsService } from '@core/analytics/analytics.service';

@Component({
  selector: 'cv-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  account?: Account;
  transactions: any[] = [];

  txnColumns: DsColumnDef[] = [
    { key: 'postedDate', header: 'Date', type: 'date' },
    { key: 'description', header: 'Description' },
    { key: 'category', header: 'Category' },
    { key: 'amount', header: 'Amount', type: 'currency', align: 'right' }
  ];

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    // FIXME: subscribe leak — convert to async pipe or takeUntil pattern
    this.route.paramMap
      .pipe(switchMap((params) => this.accountsService.getById(params.get('id') ?? '')))
      .subscribe((account) => {
        this.account = account;
        if (account) {
          this.analytics.trackEvent('accounts.detail.view', { accountId: account.accountId });
          this.accountsService.getRecentTransactions(account.accountId).subscribe((txns) => {
            this.transactions = txns;
          });
        }
      });
  }
}
