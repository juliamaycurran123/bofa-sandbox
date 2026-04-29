import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { DesignSystemModule } from '@design-system/design-system.module';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [{ path: '', component: TransactionsComponent }];

@NgModule({
  declarations: [TransactionsComponent],
  imports: [CommonModule, FormsModule, DesignSystemModule, RouterModule.forChild(routes)]
})
export class TransactionsModule {}
