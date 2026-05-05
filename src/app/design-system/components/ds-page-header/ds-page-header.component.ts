import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ds-page-header',
  standalone: true,
  templateUrl: './ds-page-header.component.html',
  styleUrl: './ds-page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsPageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
}
