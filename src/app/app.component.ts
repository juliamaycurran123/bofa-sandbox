import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AnalyticsService } from './core/analytics/analytics.service';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ClearVault';

  constructor(
    private router: Router,
    private analytics: AnalyticsService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.analytics.trackPage(e.urlAfterRedirects);
      });
  }

  signOut(): void {
    this.analytics.trackEvent('auth.signout');
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
