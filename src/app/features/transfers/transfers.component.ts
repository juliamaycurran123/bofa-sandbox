import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import { AccountsService } from '../accounts/accounts.service';
import { Account } from '../accounts/account.model';
import { MfaService } from '@core/auth/mfa.service';
import { AnalyticsService } from '@core/analytics/analytics.service';

@Component({
  selector: 'cv-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  form: FormGroup;
  accounts: Account[] = [];
  submitting = false;
  mfaRequired = false;
  mfaChallengeId: string | null = null;
  mfaCode = '';

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private mfa: MfaService,
    private snack: MatSnackBar,
    private analytics: AnalyticsService
  ) {
    this.form = this.fb.group({
      fromAccountId: ['', Validators.required],
      toAccountId: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      memo: ['']
    });
  }

  ngOnInit(): void {
    this.accountsService.list().subscribe((accts) => (this.accounts = accts));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    const value = this.form.value;
    this.analytics.trackEvent('transfers.initiate', { amount: value.amount });

    // Step-up MFA for transfers > $1000
    if (value.amount > 1000) {
      this.mfa.requestChallenge('sms').subscribe((c) => {
        this.mfaChallengeId = c.challengeId;
        this.mfaRequired = true;
        this.submitting = false;
      });
      return;
    }

    this.completeTransfer();
  }

  verifyMfa(): void {
    if (!this.mfaChallengeId) return;
    this.submitting = true;
    this.mfa.verify(this.mfaChallengeId, this.mfaCode).subscribe((ok) => {
      if (ok) {
        this.completeTransfer();
      } else {
        this.snack.open('Invalid verification code', 'Dismiss', { duration: 3000 });
        this.submitting = false;
      }
    });
  }

  private completeTransfer(): void {
    setTimeout(() => {
      this.snack.open('Transfer submitted', 'Dismiss', { duration: 3000 });
      this.analytics.trackEvent('transfers.completed', { amount: this.form.value.amount });
      this.form.reset();
      this.mfaRequired = false;
      this.mfaChallengeId = null;
      this.mfaCode = '';
      this.submitting = false;
    }, 400);
  }
}
