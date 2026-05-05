import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ds-currency',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './ds-currency.component.html',
  styleUrl: './ds-currency.component.scss',
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
