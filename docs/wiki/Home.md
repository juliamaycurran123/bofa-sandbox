# ClearVault Customer Portal — Wiki

ClearVault is the retail digital banking customer portal serving consumer banking accounts (checking, savings, credit cards, transfers). This wiki documents the architecture, conventions, and development workflow for the Angular SPA that powers the portal.

## Quick Links

| Page | Description |
|------|-------------|
| [Getting Started](Getting-Started.md) | Local setup, build, and test commands |
| [Architecture Overview](Architecture-Overview.md) | High-level structure, module map, and data flow |
| [Routing & Navigation](Routing-and-Navigation.md) | Route definitions, lazy loading, and guards |
| [Authentication & Security](Authentication-and-Security.md) | SSO, MFA, interceptors, and session management |
| [Design System](Design-System.md) | Shared component library (`ds-*` components and tokens) |
| [Feature Modules](Feature-Modules.md) | Dashboard, Accounts, Transactions, Transfers, Settings |
| [Data Providers](Data-Providers.md) | Plaid, Yodlee, and Finicity integrations |
| [Analytics](Analytics.md) | `cvanalytics` SDK shim and event tracking |
| [State Management](State-Management.md) | ngrx-style service pattern |
| [Testing](Testing.md) | Karma/Jasmine setup and test conventions |
| [Coding Conventions](Coding-Conventions.md) | Naming, imports, PII handling, and style rules |
| [Environment Configuration](Environment-Configuration.md) | Environment files and feature flags |

## Owners

| Domain | Team |
|--------|------|
| Platform / SPA shell | @platform-fe-team |
| Design System | @design-system-team |
| Auth / Identity | @identity-platform |
