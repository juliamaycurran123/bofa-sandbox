import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DesignSystemModule } from '@design-system/design-system.module';
import { TransfersComponent } from './transfers.component';

const routes: Routes = [{ path: '', component: TransfersComponent }];

@NgModule({
  declarations: [TransfersComponent],
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, DesignSystemModule, RouterModule.forChild(routes)]
})
export class TransfersModule {}
