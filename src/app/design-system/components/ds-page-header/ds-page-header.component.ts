import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ds-page-header',
  templateUrl: './ds-page-header.component.html',
  styleUrls: ['./ds-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsPageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
}
