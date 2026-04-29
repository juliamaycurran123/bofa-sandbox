import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface SsoTokenPayload {
  sub: string;
  customerId: string;
  scope: string[];
  exp: number;
  amr: string[]; // authentication methods reference
}

/**
 * Stub for the platform identity service SSO integration.
 * In production, this redirects to the corporate IdP and exchanges the auth code
 * for an access token via the platform-identity-broker service.
 *
 * For now (sandbox), returns mocked tokens.
 */
@Injectable()
export class SsoService {
  private currentToken: string | null = null;

  initiateLogin(returnUrl: string): void {
    const issuer = environment.ssoIssuer;
    // In real impl: window.location.href = `${issuer}/authorize?...`
    console.log(`[SSO] Would redirect to ${issuer}/authorize?return=${encodeURIComponent(returnUrl)}`);
  }

  exchangeCodeForToken(code: string): Observable<string> {
    if (!code) {
      return throwError(() => new Error('Missing auth code'));
    }
    const fakeToken = this.makeFakeToken('cust_8821');
    this.currentToken = fakeToken;
    return of(fakeToken).pipe(delay(150));
  }

  getToken(): string | null {
    return this.currentToken ?? this.bootstrapTokenForDev();
  }

  parseToken(token: string): SsoTokenPayload | null {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

  clearToken(): void {
    this.currentToken = null;
  }

  private makeFakeToken(customerId: string): string {
    const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const payload: SsoTokenPayload = {
      sub: customerId,
      customerId,
      scope: ['accounts:read', 'transactions:read', 'transfers:write'],
      exp: Math.floor(Date.now() / 1000) + 3600,
      amr: ['mfa', 'sso']
    };
    return `${header}.${btoa(JSON.stringify(payload))}.fake-signature`;
  }

  private bootstrapTokenForDev(): string {
    if (!environment.production) {
      return this.makeFakeToken('cust_dev');
    }
    return '';
  }
}
