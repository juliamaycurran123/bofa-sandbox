import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SsoService } from './sso.service';
import { environment } from '@env/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sso: SsoService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only attach token for our own API surfaces
    const isOurApi = req.url.startsWith(environment.apiBaseUrl) || req.url.startsWith('/api');
    if (!isOurApi) {
      return next.handle(req);
    }

    const token = this.sso.getToken();
    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'X-Client-App': 'clearvault-portal'
      }
    });
    return next.handle(authReq);
  }
}
