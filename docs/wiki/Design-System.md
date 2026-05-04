# Design System

## Overview

The ClearVault Design System is a shared Angular component library built on top of Angular Material. It is consumed by all feature modules within this app and also published as `@clearvault/design-system` for use by **6+ downstream applications** (mortgage, auto-loans, wealth, credit-card, business-banking, atm-locator).

> **Breaking changes here block downstream builds.** Coordinate via `#design-system-changes` before making changes.

## Module: `DesignSystemModule`

Located at `src/app/design-system/design-system.module.ts`. This module:

1. **Declares** the custom `ds-*` components.
2. **Imports** Angular Material modules.
3. **Exports** both custom components and Material modules — so feature modules only need to import `DesignSystemModule`, never `@angular/material/*` directly.

## Components

### `ds-button`

Selector: `<ds-button>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `boolean` | `false` | Shows loading state |
| `type` | `'button' \| 'submit'` | `'button'` | HTML button type |
| `ariaLabel` | `string` | — | Accessibility label |

| Output | Type | Description |
|--------|------|-------------|
| `pressed` | `EventEmitter<MouseEvent>` | Emitted on click (suppressed when disabled/loading) |

Uses `ChangeDetectionStrategy.OnPush`.

### `ds-card`

Selector: `<ds-card>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | — | Card header title |
| `subtitle` | `string` | — | Card header subtitle |
| `elevated` | `boolean` | `true` | Apply box shadow |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Content padding |

Content is projected via `<ng-content>`.

### `ds-currency`

Selector: `<ds-currency>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `amount` | `number \| null` | `0` | Currency value to display |
| `currency` | `string` | `'USD'` | ISO currency code |
| `showSign` | `boolean` | `false` | Show +/− sign |

Exposes computed properties: `isNegative` and `displayValue` (absolute value).

### `ds-data-table`

Selector: `<ds-data-table>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `rows` | `any[]` | `[]` | Row data |
| `columns` | `DsColumnDef[]` | `[]` | Column definitions |
| `emptyMessage` | `string` | `'No data to display'` | Message when rows are empty |

**`DsColumnDef` interface:**

```typescript
interface DsColumnDef {
  key: string;           // property name on the row object
  header: string;        // column header text
  type?: 'text' | 'currency' | 'date';  // render format
  align?: 'left' | 'right';
}
```

> **Note:** `rows` is typed as `any[]` for historical reasons. Tighten this when migrating consumers.

### `ds-page-header`

Selector: `<ds-page-header>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | *required* | Page heading |
| `subtitle` | `string` | — | Sub-heading text |

Action buttons can be projected via `<ng-content>` (e.g., a "Make a Transfer" button).

## Design Tokens

Located in `src/app/design-system/tokens/`.

### Colors (`_colors.scss`)

| Token | Value | Usage |
|-------|-------|-------|
| `$cv-color-primary` | `#003b7a` | Primary brand blue |
| `$cv-color-primary-hover` | `#002b5a` | Primary hover state |
| `$cv-color-secondary` | `#c4161c` | Secondary / accent red |
| `$cv-color-success` | `#157b3a` | Success states |
| `$cv-color-warning` | `#b56500` | Warning states |
| `$cv-color-danger` | `#b00020` | Error / destructive actions |
| `$cv-color-bg` | `#f6f7f9` | Page background |
| `$cv-color-surface` | `#ffffff` | Card / component surfaces |
| `$cv-color-text` | `#1a1a1a` | Primary text |
| `$cv-color-text-muted` | `#5f6b7a` | Secondary / muted text |
| `$cv-color-border` | `#d8dde3` | Borders and dividers |

### Spacing (`_spacing.scss`)

| Token | Value |
|-------|-------|
| `$cv-spacing-xs` | `4px` |
| `$cv-spacing-sm` | `8px` |
| `$cv-spacing-md` | `16px` |
| `$cv-spacing-lg` | `24px` |
| `$cv-spacing-xl` | `32px` |
| `$cv-spacing-xxl` | `48px` |

## Angular Material Modules Re-exported

The `DesignSystemModule` re-exports these Material modules so feature modules don't need to import them directly:

- `MatButtonModule`
- `MatCardModule`
- `MatTableModule`
- `MatIconModule`
- `MatProgressSpinnerModule`
- `MatToolbarModule`
- `MatFormFieldModule`
- `MatInputModule`
- `MatSelectModule`
- `MatDividerModule`
