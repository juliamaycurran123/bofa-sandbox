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

/** Standalone components — imported, not declared */
const STANDALONE = [DsButtonComponent];

/** Legacy (non-standalone) components — still declared */
const DECLARED_COMPONENTS = [
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

@NgModule({
  declarations: DECLARED_COMPONENTS,
  imports: [CommonModule, ...MATERIAL, ...STANDALONE],
  exports: [...DECLARED_COMPONENTS, ...STANDALONE, ...MATERIAL]
})
export class DesignSystemModule {}
