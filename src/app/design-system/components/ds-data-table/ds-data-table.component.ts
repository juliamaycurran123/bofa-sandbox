import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface DsColumnDef {
  key: string;
  header: string;
  type?: 'text' | 'currency' | 'date';
  align?: 'left' | 'right';
}

@Component({
  selector: 'ds-data-table',
  templateUrl: './ds-data-table.component.html',
  styleUrls: ['./ds-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsDataTableComponent {
  // NOTE: rows is any[] for historical reasons — older feature modules pass mixed shapes here.
  // Tighten when migrating consumers.
  @Input() rows: any[] = [];
  @Input() columns: DsColumnDef[] = [];
  @Input() emptyMessage = 'No data to display';

  get columnKeys(): string[] {
    return this.columns.map((c) => c.key);
  }
}
