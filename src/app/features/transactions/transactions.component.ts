import { Component, OnInit } from '@angular/core';

import { AccountsService } from '../accounts/accounts.service';
import { DsColumnDef } from '@design-system/components/ds-data-table/ds-data-table.component';
import { AnalyticsService } from '@core/analytics/analytics.service';

@Component({
  selector: 'cv-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  search = '';
  category = 'ALL';
  allTransactions: any[] = [];
  filtered: any[] = [];

  categories = ['ALL', 'Groceries', 'Dining', 'Auto', 'Income', 'Bills', 'Other'];

  columns: DsColumnDef[] = [
    { key: 'postedDate', header: 'Date', type: 'date' },
    { key: 'description', header: 'Description' },
    { key: 'category', header: 'Category' },
    { key: 'amount', header: 'Amount', type: 'currency', align: 'right' }
  ];

  constructor(private accountsService: AccountsService, private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.analytics.trackEvent('transactions.view');
    // Aggregate transactions across all accounts
    this.accountsService.list().subscribe((accounts) => {
      Promise.all(
        accounts.map(
          (a) =>
            new Promise<any[]>((resolve) => {
              this.accountsService.getRecentTransactions(a.accountId).subscribe(resolve);
            })
        )
      ).then((results) => {
        this.allTransactions = results.flat();
        this.applyFilters();
      });
    });
  }

  applyFilters(): void {
    const q = this.search.toLowerCase();
    this.filtered = this.allTransactions.filter((t) => {
      const matchesSearch = !q || t.description.toLowerCase().includes(q);
      const matchesCategory = this.category === 'ALL' || t.category === this.category;
      return matchesSearch && matchesCategory;
    });
  }
}
