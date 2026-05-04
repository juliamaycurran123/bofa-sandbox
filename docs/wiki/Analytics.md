# Analytics

## Overview

ClearVault uses a proprietary analytics SDK (`cvanalytics`) loaded via a script tag in the corporate platform shell. The `AnalyticsService` provides a typed Angular wrapper around this SDK.

**File:** `src/app/core/analytics/analytics.service.ts`

## How It Works

The `cvanalytics` SDK is expected to be available on `window.cvanalytics`. Since the SDK is injected by the platform shell (not bundled in this app), it may not be available immediately or at all in local development.

### Buffering

If `window.cvanalytics` is not available:

- Events are queued in an internal buffer.
- A flush interval (every 2 seconds) checks for SDK availability and replays buffered events.
- In non-production environments, buffered events are logged to `console.debug` with the prefix `[analytics:buffered]`.

## API

| Method | Parameters | Description |
|--------|-----------|-------------|
| `trackEvent(name, properties?)` | `name: string`, `properties?: Record<string, any>` | Track a user action |
| `trackPage(name, properties?)` | `name: string`, `properties?: Record<string, any>` | Track a page view |
| `identify(customerId, traits?)` | `customerId: string`, `traits?: Record<string, any>` | Identify the current user |

## Event Catalog

| Event Name | Source | Properties |
|-----------|--------|------------|
| `dashboard.view` | DashboardComponent | — |
| `accounts.list.view` | AccountListComponent | — |
| `accounts.detail.view` | AccountDetailComponent | `accountId` |
| `transactions.view` | TransactionsComponent | — |
| `transfers.initiate` | TransfersComponent | `amount` |
| `transfers.completed` | TransfersComponent | `amount` |
| `settings.notification.toggle` | SettingsComponent | `key`, `value` |
| `auth.signout` | AppComponent | — |

## Page Tracking

Page views are tracked automatically in `AppComponent.ngOnInit()`:

```typescript
this.router.events
  .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
  .subscribe((e) => {
    this.analytics.trackPage(e.urlAfterRedirects);
  });
```

## PII Warning

`AnalyticsService.trackEvent()` is the **only sanctioned path** for emitting transaction-related events. It strips PII before sending. Never log transaction data (account numbers, customer names, descriptions, account masks) directly to console, error messages, or other analytics channels.
