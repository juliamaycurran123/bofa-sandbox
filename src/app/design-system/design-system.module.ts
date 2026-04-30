import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { DsButtonComponent } from './components/ds-button/ds-button.component';
import { DsCardComponent } from './components/ds-card/ds-card.component';
import { DsDataTableComponent } from './components/ds-data-table/ds-data-table.component';
import { DsCurrencyComponent } from './components/ds-currency/ds-currency.component';
import { DsPageHeaderComponent } from './components/ds-page-header/ds-page-header.component';

const COMPONENTS = [
  DsButtonComponent,
  DsDataTableComponent,
  DsCurrencyComponent,
  DsPageHeaderComponent
];

const STANDALONE_COMPONENTS = [
  DsCardComponent
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
  imports: [CommonModule, ...MATERIAL, ...STANDALONE_COMPONENTS],
  exports: [...COMPONENTS, ...STANDALONE_COMPONENTS, ...MATERIAL]
})
export class DesignSystemModule {}
