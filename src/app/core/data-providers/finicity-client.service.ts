import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface FinicityVoaReport {
  reportId: string;
  customerId: string;
  generatedDate: string;
  assetsTotal: number;
}

/**
 * Finicity (Mastercard) integration. Currently used only for VOA (Verification
 * of Assets) reports during loan applications. Limited surface area.
 */
@Injectable()
export class FinicityClientService {
  private readonly base = `${environment.apiBaseUrl}/integrations/finicity`;

  constructor(private http: HttpClient) {}

  generateVoaReport(customerId: string): Observable<FinicityVoaReport> {
    return of({
      reportId: `voa_${Date.now()}`,
      customerId,
      generatedDate: new Date().toISOString(),
      assetsTotal: 75000
    }).pipe(delay(220));
  }
}
