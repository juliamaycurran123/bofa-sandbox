import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './ds-card.component.html',
  styleUrl: './ds-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() elevated = true;
  @Input() padding: 'sm' | 'md' | 'lg' = 'md';
}
