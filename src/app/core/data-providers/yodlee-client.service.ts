import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface YodleeAccountSummary {
  id: number;
  accountName: string;
  accountType: string;
  balance: { amount: number; currency: string };
  providerName: string;
}

/**
 * Yodlee aggregator integration for net-worth and PFM features.
 * Used as a fallback / alt to Plaid for institutions Plaid doesn't cover.
 */
@Injectable()
export class YodleeClientService {
  private readonly base = `${environment.apiBaseUrl}/integrations/yodlee`;

  constructor(private http: HttpClient) {}

  getAccounts(customerId: string): Observable<YodleeAccountSummary[]> {
    return of<YodleeAccountSummary[]>([
      {
        id: 1,
        accountName: 'Brokerage',
        accountType: 'INVESTMENT',
        balance: { amount: 48230.12, currency: 'USD' },
        providerName: 'Vanguard'
      }
    ]).pipe(delay(180));
  }
}
