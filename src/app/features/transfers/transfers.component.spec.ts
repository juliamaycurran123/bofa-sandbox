import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignSystemModule } from '@design-system/design-system.module';
import { TransfersComponent } from './transfers.component';
import { AccountsService } from '../accounts/accounts.service';
import { MfaService } from '@core/auth/mfa.service';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { of } from 'rxjs';

describe('TransfersComponent', () => {
  let component: TransfersComponent;
  let fixture: ComponentFixture<TransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransfersComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        RouterTestingModule,
        DesignSystemModule
      ],
      providers: [
        { provide: AccountsService, useValue: { list: () => of([]) } },
        { provide: MfaService, useValue: { requestChallenge: () => of({ challengeId: 'x', channel: 'sms', expiresAt: 0 }), verify: () => of(true) } },
        { provide: AnalyticsService, useValue: { trackEvent: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid initially', () => {
    expect(component.form.valid).toBe(false);
  });

  // TODO: cover MFA flow, large-amount step-up, error states, account validation (from === to)
});
