# Routing & Navigation

## Route Table

All routes (except the root redirect and wildcard) are protected by `AuthGuard` and use lazy-loaded feature modules.

| Path | Module | Component | Guard |
|------|--------|-----------|-------|
| `/` | — | Redirects to `/dashboard` | — |
| `/dashboard` | `DashboardModule` | `DashboardComponent` | `AuthGuard` |
| `/accounts` | `AccountsModule` | `AccountListComponent` | `AuthGuard` |
| `/accounts/:id` | `AccountsModule` | `AccountDetailComponent` | `AuthGuard` |
| `/transactions` | `TransactionsModule` | `TransactionsComponent` | `AuthGuard` |
| `/transfers` | `TransfersModule` | `TransfersComponent` | `AuthGuard` |
| `/settings` | `SettingsModule` | `SettingsComponent` | `AuthGuard` |
| `**` | — | Redirects to `/dashboard` | — |

## Lazy Loading

Each feature module is loaded on demand using dynamic `import()`:

```typescript
{
  path: 'dashboard',
  canActivate: [AuthGuard],
  loadChildren: () =>
    import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
}
```

This keeps the initial bundle small and loads feature code only when the user navigates to it.

## Navigation Bar

The top-level navigation is rendered in `AppComponent` (`cv-root`) using a `mat-toolbar`:

- **Dashboard** → `/dashboard`
- **Accounts** → `/accounts`
- **Activity** → `/transactions`
- **Transfers** → `/transfers`
- **Settings** → `/settings`

Active links are highlighted with the `cv-nav-active` CSS class via `routerLinkActive`.

## AuthGuard

The `AuthGuard` is a class-based route guard (`CanActivate`). If the user is not authenticated, it redirects to `/login` with a `return` query parameter:

```typescript
canActivate(route, state): boolean | UrlTree {
  if (this.auth.isAuthenticated()) return true;
  return this.router.createUrlTree(['/login'], { queryParams: { return: state.url } });
}
```

> **Migration note:** This class-based guard is deprecated in newer Angular versions. It should be converted to a functional guard (`CanActivateFn`) in a future cleanup.

## Application Shell

```
┌──────────────────────────────────────┐
│  mat-toolbar (sticky, primary)       │
│  [Brand] [Dashboard] [Accounts] ...  │
├──────────────────────────────────────┤
│                                      │
│  <router-outlet> (main content)      │
│                                      │
├──────────────────────────────────────┤
│  footer — FDIC / Equal Housing       │
└──────────────────────────────────────┘
```
