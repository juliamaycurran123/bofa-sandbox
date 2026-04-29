import { Component } from '@angular/core';

import { AnalyticsService } from '@core/analytics/analytics.service';

@Component({
  selector: 'cv-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  notifications = {
    transactionAlerts: true,
    fraudAlerts: true,
    promotional: false,
    statementReady: true
  };

  constructor(private analytics: AnalyticsService) {}

  onToggle(key: keyof typeof this.notifications): void {
    this.analytics.trackEvent('settings.notification.toggle', {
      key,
      value: this.notifications[key]
    });
  }
}
