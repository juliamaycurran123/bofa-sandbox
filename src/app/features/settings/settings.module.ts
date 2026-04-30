import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DesignSystemModule } from '@design-system/design-system.module';
import { SettingsComponent } from './settings.component';

const routes: Routes = [{ path: '', component: SettingsComponent }];

// Note: MatSlideToggleModule imported directly here instead of via DesignSystemModule.
// This is the kind of inconsistency Knowledge or AGENTS.md should call out.
@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, FormsModule, DesignSystemModule, MatSlideToggleModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
