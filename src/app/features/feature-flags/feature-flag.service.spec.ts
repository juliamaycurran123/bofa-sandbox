import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { FeatureFlagService } from './feature-flag.service';
import { AuditEntry } from './feature-flag.model';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial flags', (done) => {
    service.getFlags().pipe(first()).subscribe((flags) => {
      expect(flags.length).toBeGreaterThan(0);
      expect(flags[0].flagId).toBe('flag_001');
      done();
    });
  });

  it('should create an audit entry when toggling a flag', (done) => {
    const initialAuditCount = 3;
    service.toggleFlag('flag_001');

    service.getAuditLog().pipe(first()).subscribe((entries) => {
      expect(entries.length).toBe(initialAuditCount + 1);
      const latest = entries[0];
      expect(latest.flagId).toBe('flag_001');
      expect(latest.action).toBe('disabled');
      expect(latest.previousValue).toBe('enabled');
      expect(latest.newValue).toBe('disabled');
      done();
    });
  });

  it('should toggle flag enabled state', (done) => {
    service.toggleFlag('flag_001');

    service.getFlags().pipe(first()).subscribe((flags) => {
      const flag = flags.find((f) => f.flagId === 'flag_001');
      expect(flag?.enabled).toBe(false);
      done();
    });
  });

  it('should create an audit entry when updating rollout', (done) => {
    const initialAuditCount = 3;
    service.updateRollout('flag_003', 75);

    service.getAuditLog().pipe(first()).subscribe((entries) => {
      expect(entries.length).toBe(initialAuditCount + 1);
      const latest = entries[0];
      expect(latest.flagId).toBe('flag_003');
      expect(latest.action).toBe('rollout_changed');
      expect(latest.previousValue).toBe('50%');
      expect(latest.newValue).toBe('75%');
      done();
    });
  });

  it('should update rollout percentage', (done) => {
    service.updateRollout('flag_003', 75);

    service.getFlags().pipe(first()).subscribe((flags) => {
      const flag = flags.find((f) => f.flagId === 'flag_003');
      expect(flag?.rolloutPercentage).toBe(75);
      done();
    });
  });

  it('should create an audit entry when adding a tag', (done) => {
    const initialAuditCount = 3;
    service.addTag('flag_001', 'new-tag');

    service.getAuditLog().pipe(first()).subscribe((entries) => {
      expect(entries.length).toBe(initialAuditCount + 1);
      const latest = entries[0];
      expect(latest.flagId).toBe('flag_001');
      expect(latest.action).toBe('tag_added');
      expect(latest.newValue).toBe('new-tag');
      done();
    });
  });

  it('should not duplicate tags', (done) => {
    service.addTag('flag_001', 'core');

    service.getFlags().pipe(first()).subscribe((flags) => {
      const flag = flags.find((f) => f.flagId === 'flag_001');
      const coreCount = flag?.tags.filter((t) => t === 'core').length;
      expect(coreCount).toBe(1);
      done();
    });
  });

  it('should return audit entries for a specific flag limited to N', (done) => {
    service.toggleFlag('flag_001');
    service.toggleFlag('flag_001');
    service.toggleFlag('flag_001');

    service.getAuditEntriesForFlag('flag_001', 2).pipe(first()).subscribe((entries) => {
      expect(entries.length).toBe(2);
      entries.forEach((e: AuditEntry) => expect(e.flagId).toBe('flag_001'));
      done();
    });
  });

  it('should return recent activity across all flags limited to N', (done) => {
    service.getRecentActivity(2).pipe(first()).subscribe((entries) => {
      expect(entries.length).toBe(2);
      expect(entries[0].changedAt.getTime()).toBeGreaterThanOrEqual(entries[1].changedAt.getTime());
      done();
    });
  });

  it('should return flag name by id', () => {
    expect(service.getFlagName('flag_001')).toBe('Instant Transfers');
    expect(service.getFlagName('unknown')).toBe('unknown');
  });
});
