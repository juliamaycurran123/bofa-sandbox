# Coding Conventions

## Component Naming

| Prefix | Scope | Example |
|--------|-------|---------|
| `cv-` | Application-level components | `cv-dashboard`, `cv-account-list` |
| `ds-` | Design System components | `ds-button`, `ds-card`, `ds-currency` |

All components must use one of these prefixes. The `cv` prefix is configured as the default in `angular.json`.

## Import Rules

### Material Imports

Feature modules must **never** import `@angular/material/*` directly. All Material modules are re-exported through `DesignSystemModule`. This ensures consistent theming and makes it possible to swap Material internals without touching feature code.

```typescript
// ✅ Correct
import { DesignSystemModule } from '@design-system/design-system.module';

// ❌ Wrong — do not do this in feature modules
import { MatButtonModule } from '@angular/material/button';
```

### Path Aliases

Use TypeScript path aliases for cross-module imports:

```typescript
import { AuthService } from '@core/auth/auth.service';
import { DesignSystemModule } from '@design-system/design-system.module';
import { Account } from '@features/accounts/account.model';
import { environment } from '@env/environment';
```

## PII Handling

The `Transaction` model and any code touching transaction data is **PII-adjacent**. The following must never appear in:

- Console logs (`console.log`, `console.error`, etc.)
- Error messages (thrown or displayed)
- Analytics payloads (except through `AnalyticsService.trackEvent()` which strips PII)
- Test fixtures with real values

**Protected fields:** account numbers, customer names, transaction descriptions, account masks.

Use the test fixtures in `src/test/fixtures/transactions.ts` for any test data.

`AnalyticsService.trackEvent()` is the **only sanctioned path** for emitting transaction-related events.

## HTTP Conventions

- All HTTP calls go through Angular `HttpClient`.
- The `AuthInterceptor` automatically injects bearer tokens for first-party API calls.
- Service base URLs come from `environment.apiBaseUrl`.
- Do not hardcode API URLs in components.

## State Management

- State lives in singleton services (see [State Management](State-Management.md)).
- Expose state as `Observable` — never expose `BehaviorSubject` directly.
- Prefer the `async` pipe over manual `.subscribe()` calls.
- If subscribing imperatively, always clean up (use `takeUntil` or unsubscribe in `ngOnDestroy`).

## SCSS / Styling

- Use design tokens from `tokens/_colors.scss` and `tokens/_spacing.scss`.
- Do not override token values in feature modules.
- Use BEM-like naming scoped to the component: `.cv-dashboard__total`, `.cv-account-list__row`.
- Global styles go in `src/styles.scss`.
- Component styles use SCSS (configured in `angular.json`).

## Change Detection

Design System components use `ChangeDetectionStrategy.OnPush` for performance. Ensure inputs are immutable or use observables to trigger change detection.

## Analytics

Every user-facing view and significant action should emit an analytics event. See the [Analytics](Analytics.md) page for the event catalog and conventions.

## Regulatory

The global footer must always display: "© ClearVault Bank, N.A. Member FDIC. Equal Housing Lender." This is a regulatory requirement.
