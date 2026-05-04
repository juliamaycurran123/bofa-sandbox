# Architecture Overview

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 18 (upgraded from Angular 14) |
| UI Components | Angular Material 18 + custom Design System |
| State | ngrx-style singleton services (homegrown) |
| Charts | Chart.js via ng2-charts |
| HTTP | Angular HttpClient with AuthInterceptor |
| Testing | Karma + Jasmine |
| Language | TypeScript 5.5, SCSS |
| Bundler | Angular CLI / Webpack (via `@angular-devkit/build-angular`) |

## Source Layout

```
src/app/
├── core/                    # Singletons — imported only in AppModule
│   ├── auth/                # AuthService, SsoService, MfaService, AuthGuard, AuthInterceptor
│   ├── analytics/           # AnalyticsService (cvanalytics SDK shim)
│   └── data-providers/      # PlaidClientService, YodleeClientService, FinicityClientService
├── design-system/           # Shared UI library (also published as @clearvault/design-system)
│   ├── components/          # ds-button, ds-card, ds-data-table, ds-currency, ds-page-header
│   └── tokens/              # SCSS design tokens (_colors.scss, _spacing.scss)
└── features/                # Lazy-loaded feature modules
    ├── dashboard/           # Landing page, account summary
    ├── accounts/            # Account list + detail + transactions
    ├── transactions/        # Cross-account transaction search & filter
    ├── transfers/           # Internal fund transfers with MFA step-up
    └── settings/            # Notification preferences
```

## Module Hierarchy

```
AppModule
├── BrowserModule
├── BrowserAnimationsModule
├── AppRoutingModule          ← route definitions, lazy-loading
├── CoreModule                ← singleton services (auth, analytics, data providers)
└── DesignSystemModule        ← shared UI components + Angular Material re-exports
     └── (lazy) DashboardModule
     └── (lazy) AccountsModule
     └── (lazy) TransactionsModule
     └── (lazy) TransfersModule
     └── (lazy) SettingsModule
```

### CoreModule Guard

`CoreModule` includes a constructor guard that throws if it is ever imported more than once. This ensures all singleton services are instantiated exactly once:

```typescript
constructor(@Optional() @SkipSelf() parent?: CoreModule) {
  if (parent) {
    throw new Error('CoreModule already loaded. Import only in AppModule.');
  }
}
```

## Data Flow

1. User navigates to a route → `AuthGuard` checks session validity
2. Feature component calls a domain service (e.g., `AccountsService`)
3. Service makes HTTP call → `AuthInterceptor` attaches bearer token
4. Response flows back through the service → component renders via Design System components
5. User actions are tracked via `AnalyticsService.trackEvent()`

## TypeScript Path Aliases

Configured in `tsconfig.json`:

| Alias | Maps to |
|-------|---------|
| `@core/*` | `src/app/core/*` |
| `@design-system/*` | `src/app/design-system/*` |
| `@features/*` | `src/app/features/*` |
| `@env/*` | `src/environments/*` |
