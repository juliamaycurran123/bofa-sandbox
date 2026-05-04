# Data Providers

ClearVault integrates with three external account aggregation services for linking external bank accounts and financial reporting. All data provider services are registered as singletons in `CoreModule` and located under `src/app/core/data-providers/`.

> **Current state:** All three services return mocked/fixture data. The integration endpoints point to `environment.apiBaseUrl/integrations/<provider>`.

---

## Plaid (`PlaidClientService`)

**File:** `plaid-client.service.ts`

Used for external account aggregation. Customers link external bank accounts through Plaid for transfers and personal financial management (PFM).

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `createLinkToken` | `customerId: string` | `Observable<PlaidLinkToken>` | Creates a Plaid Link session token |
| `exchangePublicToken` | `publicToken: string` | `Observable<{ access_token, item_id }>` | Exchanges a public token for persistent access |
| `getAccounts` | `itemId: string` | `Observable<PlaidAccount[]>` | Lists accounts linked through a Plaid item |

### Interfaces

```typescript
interface PlaidLinkToken {
  link_token: string;
  expiration: string;
}

interface PlaidAccount {
  account_id: string;
  name: string;
  mask: string;
  type: 'depository' | 'credit' | 'loan' | 'investment';
  subtype: string;
  balances: { available: number | null; current: number };
}
```

---

## Yodlee (`YodleeClientService`)

**File:** `yodlee-client.service.ts`

Used as a fallback/alternative to Plaid for institutions Plaid doesn't cover. Powers net-worth and PFM features.

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `getAccounts` | `customerId: string` | `Observable<YodleeAccountSummary[]>` | Lists aggregated accounts |

### Interfaces

```typescript
interface YodleeAccountSummary {
  id: number;
  accountName: string;
  accountType: string;
  balance: { amount: number; currency: string };
  providerName: string;
}
```

---

## Finicity (`FinicityClientService`)

**File:** `finicity-client.service.ts`

Mastercard's Finicity integration. Currently used only for **Verification of Assets (VOA)** reports during loan applications. Limited surface area.

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `generateVoaReport` | `customerId: string` | `Observable<FinicityVoaReport>` | Generates a VOA report |

### Interfaces

```typescript
interface FinicityVoaReport {
  reportId: string;
  customerId: string;
  generatedDate: string;
  assetsTotal: number;
}
```

---

## Architecture Notes

- All providers use `HttpClient` and point to `environment.apiBaseUrl`.
- Requests go through the `AuthInterceptor`, which attaches bearer tokens automatically.
- The services are designed as thin wrappers — business logic should live in feature-level services, not in these clients.
