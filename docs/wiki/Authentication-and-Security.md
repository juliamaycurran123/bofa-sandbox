# Authentication & Security

## Overview

ClearVault uses an SSO-based authentication flow backed by a corporate identity provider (IdP). The auth layer consists of four key services and one HTTP interceptor, all registered as singletons in `CoreModule`.

## Auth Components

### SsoService (`core/auth/sso.service.ts`)

Handles the OAuth-style SSO flow:

1. **`initiateLogin(returnUrl)`** — Redirects to the corporate IdP authorize endpoint.
2. **`exchangeCodeForToken(code)`** — Exchanges the authorization code for a JWT access token.
3. **`getToken()`** — Returns the current token (or bootstraps a dev token in non-production).
4. **`parseToken(token)`** — Decodes a JWT and returns the `SsoTokenPayload`.
5. **`clearToken()`** — Clears the stored token on logout.

**Token Payload** (`SsoTokenPayload`):

| Field | Type | Description |
|-------|------|-------------|
| `sub` | `string` | Subject identifier |
| `customerId` | `string` | Internal customer ID |
| `scope` | `string[]` | Granted scopes (e.g., `accounts:read`, `transfers:write`) |
| `exp` | `number` | Expiration timestamp (Unix) |
| `amr` | `string[]` | Authentication methods reference (e.g., `mfa`, `sso`) |

> **Sandbox mode:** In non-production environments, `SsoService` generates mock tokens with a dev customer ID (`cust_dev`). No actual IdP redirect occurs.

### AuthService (`core/auth/auth.service.ts`)

Facade over `SsoService` providing reactive user state:

- **`isAuthenticated()`** — Synchronous check against the `BehaviorSubject<AuthUser | null>`.
- **`currentUser()`** — Observable stream of the current `AuthUser`.
- **`login(returnUrl)`** — Delegates to SSO login.
- **`completeLogin(code)`** — Exchanges code, updates user state.
- **`logout()`** — Clears token and resets user state.
- **`hasScope(scope)`** — Checks if current user has a specific permission scope.

### MfaService (`core/auth/mfa.service.ts`)

Step-up MFA for sensitive operations (e.g., transfers > $1,000):

- **`requestChallenge(channel)`** — Requests an MFA challenge via SMS, TOTP, or push. Returns a `MfaChallenge` with an ID and expiry.
- **`verify(challengeId, code)`** — Verifies the user's response. Returns `Observable<boolean>`.

Supported channels: `'sms' | 'totp' | 'push'`

> **Sandbox mode:** Any 6-digit numeric code passes verification.

### AuthGuard (`core/auth/auth.guard.ts`)

Protects all feature routes. Unauthenticated users are redirected to `/login` with a return URL. See [Routing & Navigation](Routing-and-Navigation.md) for details.

### AuthInterceptor (`core/auth/auth.interceptor.ts`)

HTTP interceptor that automatically attaches a bearer token to outgoing API requests:

- Only activates for URLs starting with `environment.apiBaseUrl` or `/api`.
- Adds headers: `Authorization: Bearer <token>` and `X-Client-App: clearvault-portal`.
- Requests to third-party URLs pass through untouched.

## Auth Flow Diagram

```
User navigates to /dashboard
        │
        ▼
   AuthGuard checks isAuthenticated()
        │
   ┌────┴────┐
   │ Yes     │ No
   ▼         ▼
 Allow    Redirect to /login?return=/dashboard
 route       │
             ▼
        IdP login (SSO)
             │
             ▼
        exchangeCodeForToken()
             │
             ▼
        AuthService updates user$
             │
             ▼
        Router navigates to returnUrl
```

## Security Considerations

- **Token scope:** The token carries permission scopes. Use `AuthService.hasScope()` for fine-grained access control.
- **No PII in logs:** Transaction data is PII-adjacent. See [Coding Conventions](Coding-Conventions.md#pii-handling).
- **MFA step-up:** High-value operations trigger additional verification.
- **Interceptor scope:** The `AuthInterceptor` only attaches credentials to first-party API calls, preventing token leakage to external services.
