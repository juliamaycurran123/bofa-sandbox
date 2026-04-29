import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Account } from '../account.model';
import { AccountsService } from '../accounts.service';
import { AnalyticsService } from '@core/analytics/analytics.service';

@Component({
  selector: 'cv-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  accounts$!: Observable<Account[]>;

  constructor(
    private accountsService: AccountsService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.analytics.trackEvent('accounts.list.view');
    this.accounts$ = this.accountsService.list();
  }

  formatType(type: string): string {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
