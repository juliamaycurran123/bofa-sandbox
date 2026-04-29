import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export type MfaChannel = 'sms' | 'totp' | 'push';

export interface MfaChallenge {
  challengeId: string;
  channel: MfaChannel;
  expiresAt: number;
}

/**
 * MFA step-up service. For sensitive ops (transfers >$1k, profile changes),
 * UI requests a challenge, prompts user, then verifies before proceeding.
 */
@Injectable()
export class MfaService {
  requestChallenge(channel: MfaChannel): Observable<MfaChallenge> {
    const challenge: MfaChallenge = {
      challengeId: `mfa_${Math.random().toString(36).slice(2, 10)}`,
      channel,
      expiresAt: Date.now() + 5 * 60 * 1000
    };
    return of(challenge).pipe(delay(200));
  }

  verify(challengeId: string, code: string): Observable<boolean> {
    // Sandbox: any 6-digit code passes
    return of(code).pipe(
      delay(150),
      map((c) => /^\d{6}$/.test(c))
    );
  }
}
