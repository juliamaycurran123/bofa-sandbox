import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth/auth.service';
import { SsoService } from './auth/sso.service';
import { MfaService } from './auth/mfa.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AnalyticsService } from './analytics/analytics.service';
import { PlaidClientService } from './data-providers/plaid-client.service';
import { YodleeClientService } from './data-providers/yodlee-client.service';
import { FinicityClientService } from './data-providers/finicity-client.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthService,
    SsoService,
    MfaService,
    AuthGuard,
    AnalyticsService,
    PlaidClientService,
    YodleeClientService,
    FinicityClientService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent?: CoreModule) {
    if (parent) {
      throw new Error('CoreModule already loaded. Import only in AppModule.');
    }
  }
}
