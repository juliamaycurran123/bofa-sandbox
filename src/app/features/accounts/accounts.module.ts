import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DesignSystemModule } from '@design-system/design-system.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

const routes: Routes = [
  { path: '', component: AccountListComponent },
  { path: ':id', component: AccountDetailComponent }
];

@NgModule({
  declarations: [AccountListComponent, AccountDetailComponent],
  imports: [CommonModule, DesignSystemModule, RouterModule.forChild(routes)]
})
export class AccountsModule {}
