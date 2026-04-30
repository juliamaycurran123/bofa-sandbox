import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatDividerModule } from '@angular/material/divider';

import { DsButtonComponent } from './components/ds-button/ds-button.component';
import { DsCardComponent } from './components/ds-card/ds-card.component';
import { DsDataTableComponent } from './components/ds-data-table/ds-data-table.component';
import { DsCurrencyComponent } from './components/ds-currency/ds-currency.component';
import { DsPageHeaderComponent } from './components/ds-page-header/ds-page-header.component';

const COMPONENTS = [
  DsButtonComponent,
  DsCardComponent,
  DsDataTableComponent,
  DsCurrencyComponent,
  DsPageHeaderComponent
];

const MATERIAL = [
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDividerModule
];

/**
 * Shared internal component library.
 *
 * Consumed by all feature modules in this app, and also published as
 * `@clearvault/design-system` for use in 6+ downstream apps.
 *
 * Breaking changes here block downstream builds — coordinate via #design-system-changes.
 */
@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, ...MATERIAL],
  exports: [...COMPONENTS, ...MATERIAL]
})
export class DesignSystemModule {}
