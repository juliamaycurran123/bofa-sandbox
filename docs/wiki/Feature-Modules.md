# Feature Modules

All feature modules are lazy-loaded via the `AppRoutingModule` and share a common pattern:

1. A module file that declares components and imports `DesignSystemModule` + `RouterModule.forChild(routes)`.
2. One or more page components using Design System components for layout.
3. Analytics tracking on every view and key user action.

---

## Dashboard (`/dashboard`)

**Module:** `DashboardModule`
**Component:** `DashboardComponent` (`cv-dashboard`)

The landing page after login. Displays:

- **Welcome header** — personalized greeting with the customer's first name.
- **Total balance card** — aggregated balance across all linked accounts, rendered with `<ds-currency>`.
- **Account summary cards** — one `<ds-card>` per account showing nickname, type, masked number, balance, and a "View details" link.
- **Quick action** — "Make a Transfer" button linking to `/transfers`.

**Data:** Currently uses mock data (hardcoded fixtures). A `TODO` note marks the pending migration to `AccountsService`.

**Analytics events:** `dashboard.view`

---

## Accounts (`/accounts`)

**Module:** `AccountsModule`

### Account List (`/accounts`)

**Component:** `AccountListComponent` (`cv-account-list`)

Lists all accounts (checking, savings, credit card) in card layout. Each card displays:

- Account nickname and type
- Masked account number (`•••• XXXX`)
- Current balance
- "View activity" link to the detail page

**Analytics events:** `accounts.list.view`

### Account Detail (`/accounts/:id`)

**Component:** `AccountDetailComponent` (`cv-account-detail`)

Shows a single account's details:

- **Balance card** — current balance and available balance (if applicable).
- **Recent Activity table** — transaction list rendered with `<ds-data-table>`. Columns: Date, Description, Category, Amount.
- **Transfer action** — button linking to `/transfers`.

**Data source:** `AccountsService.getById()` and `AccountsService.getRecentTransactions()`.

**Analytics events:** `accounts.detail.view` (with `accountId` property)

> **Known issue:** The component subscribes imperatively (`.subscribe()`) instead of using the `async` pipe. A `FIXME` is tracked in the source to convert to `takeUntil` or async pipe.

---

## Transactions / Activity (`/transactions`)

**Module:** `TransactionsModule`
**Component:** `TransactionsComponent` (`cv-transactions`)

Cross-account transaction search and filter view:

- **Search** — text input filtering by transaction description.
- **Category filter** — dropdown with options: ALL, Groceries, Dining, Auto, Income, Bills, Other.
- **Results table** — `<ds-data-table>` showing Date, Description, Category, Amount.

Transactions are aggregated from all accounts on init, then filtered client-side.

**Analytics events:** `transactions.view`

---

## Transfers (`/transfers`)

**Module:** `TransfersModule`
**Component:** `TransfersComponent` (`cv-transfers`)

Internal fund transfer form:

### Form Fields

| Field | Type | Validation |
|-------|------|------------|
| From Account | `mat-select` | Required |
| To Account | `mat-select` | Required |
| Amount | `number` input | Required, min $0.01 |
| Memo | text input | Optional, max 80 chars |

### MFA Step-Up

Transfers exceeding **$1,000** trigger an MFA challenge:

1. `MfaService.requestChallenge('sms')` sends a 6-digit code.
2. The form is replaced with a verification code input.
3. On successful verification, the transfer completes.

> **Sandbox:** Any 6-digit numeric code passes MFA verification.

### Flow

```
User fills form → Submit
       │
  amount > $1000?
  ┌──────┴──────┐
  │ No          │ Yes
  ▼             ▼
 Complete    Request MFA challenge
 transfer        │
                 ▼
            Show code input
                 │
                 ▼
            Verify code
            ┌────┴────┐
            │ OK      │ Fail
            ▼         ▼
         Complete   Show error snackbar
         transfer
```

**Analytics events:** `transfers.initiate` (with `amount`), `transfers.completed` (with `amount`)

---

## Settings (`/settings`)

**Module:** `SettingsModule`
**Component:** `SettingsComponent` (`cv-settings`)

Notification preference toggles:

| Setting | Default | Notes |
|---------|---------|-------|
| Transaction alerts | On | Toggle on/off |
| Fraud alerts | On | **Disabled** — required by federal regulation |
| Promotional emails | Off | Toggle on/off |
| Statement ready | On | Toggle on/off |

Each toggle emits an analytics event: `settings.notification.toggle` with `key` and `value`.
