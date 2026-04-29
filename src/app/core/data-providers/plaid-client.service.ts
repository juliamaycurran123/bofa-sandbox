import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface PlaidLinkToken {
  link_token: string;
  expiration: string;
}

export interface PlaidAccount {
  account_id: string;
  name: string;
  mask: string;
  type: 'depository' | 'credit' | 'loan' | 'investment';
  subtype: string;
  balances: { available: number | null; current: number };
}

/**
 * Wrapper around the Plaid Link integration used for external account aggregation.
 * Customers link external bank accounts through Plaid for transfers and PFM.
 */
@Injectable()
export class PlaidClientService {
  private readonly base = `${environment.apiBaseUrl}/integrations/plaid`;

  constructor(private http: HttpClient) {}

  createLinkToken(customerId: string): Observable<PlaidLinkToken> {
    // Mocked
    return of({
      link_token: `link-sandbox-${customerId}-${Date.now()}`,
      expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    }).pipe(delay(120));
  }

  exchangePublicToken(publicToken: string): Observable<{ access_token: string; item_id: string }> {
    return of({
      access_token: `access-sandbox-${publicToken.slice(0, 8)}`,
      item_id: `item_${publicToken.slice(-6)}`
    }).pipe(delay(150));
  }

  getAccounts(itemId: string): Observable<PlaidAccount[]> {
    return of<PlaidAccount[]>([
      {
        account_id: 'plaid_acct_001',
        name: 'External Checking',
        mask: '4321',
        type: 'depository',
        subtype: 'checking',
        balances: { available: 2150.55, current: 2200.00 }
      }
    ]).pipe(delay(200));
  }
}
