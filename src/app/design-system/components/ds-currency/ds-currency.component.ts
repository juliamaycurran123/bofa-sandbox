import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ds-currency',
  templateUrl: './ds-currency.component.html',
  styleUrls: ['./ds-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsCurrencyComponent {
  @Input() amount: number | null = 0;
  @Input() currency = 'USD';
  @Input() showSign = false;

  get isNegative(): boolean {
    return (this.amount ?? 0) < 0;
  }

  get displayValue(): number {
    return Math.abs(this.amount ?? 0);
  }
}
