import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export type DsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type DsButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  templateUrl: './ds-button.component.html',
  styleUrls: ['./ds-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsButtonComponent {
  @Input() variant: DsButtonVariant = 'primary';
  @Input() size: DsButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() ariaLabel?: string;

  @Output() pressed = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      return;
    }
    this.pressed.emit(event);
  }

  get matColor(): string {
    switch (this.variant) {
      case 'primary': return 'primary';
      case 'secondary': return 'accent';
      case 'danger': return 'warn';
      default: return '';
    }
  }
}
