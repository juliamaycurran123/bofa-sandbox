# Environment Configuration

## Environment Files

Angular's file replacement mechanism swaps environment files at build time.

| File | Used When |
|------|-----------|
| `src/environments/environment.ts` | Development (`ng serve`, default `ng build`) |
| `src/environments/environment.prod.ts` | Production (`ng build --configuration=production`) |

## Configuration Values

| Key | Dev Value | Prod Value | Description |
|-----|-----------|------------|-------------|
| `production` | `false` | `true` | Enables production-mode optimizations |
| `apiBaseUrl` | `https://api.clearvault.local` | `https://api.clearvault.com` | Backend API base URL |
| `ssoIssuer` | `https://identity.clearvault.local` | `https://identity.clearvault.com` | SSO/IdP issuer URL |
| `analyticsEndpoint` | `https://analytics.clearvault.local/v1/events` | `https://analytics.clearvault.com/v1/events` | Analytics event sink |

## Feature Flags

Feature flags are embedded in the environment configuration:

| Flag | Default | Description |
|------|---------|-------------|
| `instantTransfers` | `true` | Enables instant (real-time) transfers |
| `pfmInsights` | `false` | Personal financial management insights (not yet launched) |

### Usage

```typescript
import { environment } from '@env/environment';

if (environment.featureFlags.instantTransfers) {
  // show instant transfer option
}
```

## Build Configurations

Defined in `angular.json` under `projects.clearvault.architect.build.configurations`:

### Production

- File replacements: `environment.ts` → `environment.prod.ts`
- Output hashing: all files
- Bundle budgets:
  - Initial bundle: warning at 500 KB, error at 1 MB
  - Component styles: warning at 2 KB, error at 4 KB

### Development

- No optimization
- Source maps enabled
- Vendor chunk enabled
- Named chunks enabled

## Build Output

Production builds output to `dist/clearvault/`.
