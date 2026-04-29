import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ds-card',
  templateUrl: './ds-card.component.html',
  styleUrls: ['./ds-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() elevated = true;
  @Input() padding: 'sm' | 'md' | 'lg' = 'md';
}
