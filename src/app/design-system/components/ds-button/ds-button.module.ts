import { NgModule } from '@angular/core';
import { DsButtonComponent } from './ds-button.component';

/**
 * Thin re-export shim so existing NgModule-based consumers can continue to
 * `imports: [DsButtonModule]` without any changes.
 */
@NgModule({
  imports: [DsButtonComponent],
  exports: [DsButtonComponent]
})
export class DsButtonModule {}
