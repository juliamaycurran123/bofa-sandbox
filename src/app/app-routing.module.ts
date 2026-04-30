import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'accounts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/accounts/accounts.module').then((m) => m.AccountsModule)
  },
  {
    path: 'transactions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/transactions/transactions.module').then((m) => m.TransactionsModule)
  },
  {
    path: 'transfers',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/transfers/transfers.module').then((m) => m.TransfersModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/settings/settings.module').then((m) => m.SettingsModule)
  },
  {
    path: 'feature-flags',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/feature-flags/feature-flags.module').then((m) => m.FeatureFlagsModule)
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
