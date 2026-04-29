# ClearVault — Customer Portal

ClearVault is the retail digital banking customer portal serving consumer banking accounts (checking, savings, credit cards, transfers). This repo contains the customer-facing single-page application.

## Stack

- Angular 14
- Angular Material 14 (with our custom design system layered on top — see `src/app/design-system/`)
- ngrx-style services for state (homegrown, predates ngrx adoption decision)
- Karma + Jasmine for unit tests
- Internal SSO/MFA via `@core/auth` (calls into the platform identity service)
- Analytics via the proprietary `cvanalytics` SDK shim
- Account aggregation through Plaid, Yodlee, and Finicity clients

## Setup

```bash
npm install
npm start          # runs at http://localhost:4200
npm test           # karma + jasmine
npm run build:prod
```

## Architecture

```
src/app/
├── core/                # singletons, interceptors, guards, third-party clients
│   ├── auth/            # SSO, MFA, auth interceptor, route guards
│   ├── analytics/       # cvanalytics SDK shim
│   └── data-providers/  # Plaid, Yodlee, Finicity client wrappers
├── design-system/       # custom design system on top of Angular Material
│   ├── components/      # ds-button, ds-card, ds-data-table, ds-currency, etc.
│   └── tokens/          # design tokens (colors, spacing, typography)
└── features/            # feature modules consumed by the customer portal
    ├── dashboard/
    ├── accounts/
    ├── transactions/
    └── transfers/
```

The design system is also published as an internal npm package consumed by 6+ downstream apps (mortgage, auto-loans, wealth, credit-card, business-banking, atm-locator). Breaking changes here block their builds.

## Conventions

- Components must be prefixed `cv-` (app) or `ds-` (design system)
- All Material imports go through `design-system` — feature modules should never import `@angular/material/*` directly
- HTTP calls flow through `AuthInterceptor` (auto-injects bearer token)
- All user-facing actions are tracked via `AnalyticsService.trackEvent()`

## Owners

- Platform: @platform-fe-team
- Design System: @design-system-team
- Auth/Identity: @identity-platform
