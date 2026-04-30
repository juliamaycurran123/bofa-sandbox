import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AnalyticsService } from '@core/analytics/analytics.service';
import { FeatureFlag, AuditEntry } from './feature-flag.model';
import { FeatureFlagService } from './feature-flag.service';

@Component({
  selector: 'cv-feature-flags',
  templateUrl: './feature-flags.component.html',
  styleUrls: ['./feature-flags.component.scss']
})
export class FeatureFlagsComponent implements OnInit {
  flags$!: Observable<FeatureFlag[]>;
  recentActivity$!: Observable<AuditEntry[]>;

  constructor(
    private flagService: FeatureFlagService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.analytics.trackEvent('feature-flags.view');
    this.flags$ = this.flagService.getFlags();
    this.recentActivity$ = this.flagService.getRecentActivity(10);
  }

  onToggle(flag: FeatureFlag): void {
    this.flagService.toggleFlag(flag.flagId);
    this.analytics.trackEvent('feature-flags.toggle', {
      flagId: flag.flagId,
      newState: !flag.enabled
    });
  }

  onRolloutChange(flag: FeatureFlag, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (isNaN(value) || value < 0 || value > 100) return;
    this.flagService.updateRollout(flag.flagId, value);
    this.analytics.trackEvent('feature-flags.rollout_changed', {
      flagId: flag.flagId,
      newPercentage: value
    });
  }

  getAuditEntries(flagId: string): Observable<AuditEntry[]> {
    return this.flagService.getAuditEntriesForFlag(flagId, 5);
  }

  getFlagName(flagId: string): string {
    return this.flagService.getFlagName(flagId);
  }

  formatAction(action: string): string {
    return action.replace(/_/g, ' ');
  }
}
