import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DesignSystemModule } from '@design-system/design-system.module';
import { FeatureFlagsComponent } from './feature-flags.component';

const routes: Routes = [{ path: '', component: FeatureFlagsComponent }];

@NgModule({
  declarations: [FeatureFlagsComponent],
  imports: [CommonModule, DesignSystemModule, MatSlideToggleModule, RouterModule.forChild(routes)]
})
export class FeatureFlagsModule {}
