import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SsoService } from './sso.service';

export interface AuthUser {
  customerId: string;
  scopes: string[];
}

@Injectable()
export class AuthService {
  private user$ = new BehaviorSubject<AuthUser | null>(null);

  constructor(private sso: SsoService) {
    // Auto-bootstrap from existing token if one is present
    const tok = this.sso.getToken();
    if (tok) {
      const payload = this.sso.parseToken(tok);
      if (payload) {
        this.user$.next({ customerId: payload.customerId, scopes: payload.scope });
      }
    }
  }

  isAuthenticated(): boolean {
    return this.user$.value !== null;
  }

  currentUser(): Observable<AuthUser | null> {
    return this.user$.asObservable();
  }

  login(returnUrl: string = '/'): void {
    this.sso.initiateLogin(returnUrl);
  }

  completeLogin(code: string): Observable<string> {
    return this.sso.exchangeCodeForToken(code).pipe(
      tap((token) => {
        const payload = this.sso.parseToken(token);
        if (payload) {
          this.user$.next({ customerId: payload.customerId, scopes: payload.scope });
        }
      })
    );
  }

  logout(): void {
    this.sso.clearToken();
    this.user$.next(null);
  }

  hasScope(scope: string): boolean {
    return this.user$.value?.scopes.includes(scope) ?? false;
  }
}
