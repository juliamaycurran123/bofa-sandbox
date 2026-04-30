import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DesignSystemModule } from '@design-system/design-system.module';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { FeatureFlagsComponent } from './feature-flags.component';
import { FeatureFlagService } from './feature-flag.service';

describe('FeatureFlagsComponent', () => {
  let component: FeatureFlagsComponent;
  let fixture: ComponentFixture<FeatureFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureFlagsComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatSlideToggleModule,
        DesignSystemModule
      ],
      providers: [
        FeatureFlagService,
        { provide: AnalyticsService, useValue: { trackEvent: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load flags on init', () => {
    expect(component.flags$).toBeDefined();
  });

  it('should load recent activity on init', () => {
    expect(component.recentActivity$).toBeDefined();
  });

  it('should format action strings', () => {
    expect(component.formatAction('rollout_changed')).toBe('rollout changed');
    expect(component.formatAction('tag_added')).toBe('tag added');
    expect(component.formatAction('enabled')).toBe('enabled');
  });

  it('should render flag cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('ds-card');
    // 4 flag cards + 1 activity card = 5
    expect(cards.length).toBe(5);
  });

  it('should render the Activity section', () => {
    const activityCard = fixture.nativeElement.querySelector('.cv-feature-flags__activity');
    expect(activityCard).toBeTruthy();
  });
});
