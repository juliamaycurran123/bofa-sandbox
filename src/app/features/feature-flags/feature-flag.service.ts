import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FeatureFlag, AuditEntry, FlagAction } from './feature-flag.model';

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private flags$ = new BehaviorSubject<FeatureFlag[]>([
    {
      flagId: 'flag_001',
      name: 'Instant Transfers',
      description: 'Enable real-time fund transfers between accounts.',
      enabled: true,
      rolloutPercentage: 100,
      environment: 'production',
      tags: ['payments', 'core']
    },
    {
      flagId: 'flag_002',
      name: 'PFM Insights',
      description: 'Personal financial management dashboard with spending analytics.',
      enabled: false,
      rolloutPercentage: 0,
      environment: 'staging',
      tags: ['analytics', 'beta']
    },
    {
      flagId: 'flag_003',
      name: 'Dark Mode',
      description: 'Enable dark theme across the application.',
      enabled: true,
      rolloutPercentage: 50,
      environment: 'production',
      tags: ['ui', 'beta']
    },
    {
      flagId: 'flag_004',
      name: 'Biometric Login',
      description: 'Allow fingerprint and face recognition for authentication.',
      enabled: false,
      rolloutPercentage: 0,
      environment: 'development',
      tags: ['security', 'mobile']
    }
  ]);

  private auditLog$ = new BehaviorSubject<AuditEntry[]>([
    {
      flagId: 'flag_001',
      action: 'enabled',
      environment: 'production',
      changedBy: 'Sarah Chen',
      changedAt: new Date('2026-04-28T14:30:00'),
      previousValue: 'disabled',
      newValue: 'enabled'
    },
    {
      flagId: 'flag_003',
      action: 'rollout_changed',
      environment: 'production',
      changedBy: 'James Park',
      changedAt: new Date('2026-04-27T09:15:00'),
      previousValue: '25%',
      newValue: '50%'
    },
    {
      flagId: 'flag_002',
      action: 'tag_added',
      environment: 'staging',
      changedBy: 'Sarah Chen',
      changedAt: new Date('2026-04-26T16:45:00'),
      previousValue: '',
      newValue: 'beta'
    }
  ]);

  private currentUser = 'Sarah Chen';

  getFlags(): Observable<FeatureFlag[]> {
    return this.flags$.asObservable();
  }

  getAuditLog(): Observable<AuditEntry[]> {
    return this.auditLog$.asObservable();
  }

  getAuditEntriesForFlag(flagId: string, limit: number): Observable<AuditEntry[]> {
    return this.auditLog$.pipe(
      map((entries) =>
        entries
          .filter((e) => e.flagId === flagId)
          .sort((a, b) => b.changedAt.getTime() - a.changedAt.getTime())
          .slice(0, limit)
      )
    );
  }

  getRecentActivity(limit: number): Observable<AuditEntry[]> {
    return this.auditLog$.pipe(
      map((entries) =>
        [...entries]
          .sort((a, b) => b.changedAt.getTime() - a.changedAt.getTime())
          .slice(0, limit)
      )
    );
  }

  getFlagName(flagId: string): string {
    const flag = this.flags$.value.find((f) => f.flagId === flagId);
    return flag ? flag.name : flagId;
  }

  toggleFlag(flagId: string): void {
    const flags = this.flags$.value.map((f) => {
      if (f.flagId !== flagId) return f;
      const toggled = { ...f, enabled: !f.enabled };
      this.addAuditEntry({
        flagId,
        action: toggled.enabled ? 'enabled' : 'disabled',
        environment: f.environment,
        changedBy: this.currentUser,
        changedAt: new Date(),
        previousValue: f.enabled ? 'enabled' : 'disabled',
        newValue: toggled.enabled ? 'enabled' : 'disabled'
      });
      return toggled;
    });
    this.flags$.next(flags);
  }

  updateRollout(flagId: string, newPercentage: number): void {
    const flags = this.flags$.value.map((f) => {
      if (f.flagId !== flagId) return f;
      const previous = f.rolloutPercentage;
      this.addAuditEntry({
        flagId,
        action: 'rollout_changed',
        environment: f.environment,
        changedBy: this.currentUser,
        changedAt: new Date(),
        previousValue: `${previous}%`,
        newValue: `${newPercentage}%`
      });
      return { ...f, rolloutPercentage: newPercentage };
    });
    this.flags$.next(flags);
  }

  addTag(flagId: string, tag: string): void {
    const flags = this.flags$.value.map((f) => {
      if (f.flagId !== flagId) return f;
      if (f.tags.includes(tag)) return f;
      this.addAuditEntry({
        flagId,
        action: 'tag_added',
        environment: f.environment,
        changedBy: this.currentUser,
        changedAt: new Date(),
        previousValue: '',
        newValue: tag
      });
      return { ...f, tags: [...f.tags, tag] };
    });
    this.flags$.next(flags);
  }

  private addAuditEntry(entry: AuditEntry): void {
    this.auditLog$.next([entry, ...this.auditLog$.value]);
  }
}
