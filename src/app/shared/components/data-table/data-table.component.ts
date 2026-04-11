import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterMetadata, SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Table, TableFilterEvent, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeService } from '../../../layout/services/theme.service';
import { SelectModule } from 'primeng/select';
import { SelectLabelPipe } from '../../pipes/select-label.pipe';
import { DynamicPipe } from '../../pipes/dynamic.pipe';
import { IDatatableExtraOption } from '../../interfaces/data-table/IDatatableExtraOptions';
import { IColumn } from '../../interfaces/data-table/IColumn';

@Component({
  standalone: true,
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CheckboxModule,
    RouterModule,
    TooltipModule,
    SelectModule,
    SelectLabelPipe,
    DynamicPipe,
  ],
})
export class DataTableComponent<T> implements OnInit {
  @Input({ required: true })
  public cols: IColumn[] = [];

  @Input()
  public actions = true;

  @Input()
  public extraActions: IDatatableExtraOption<T>[] = [];

  @Input()
  public showGridLines = true;

  @Input()
  public stripedRows = false;

  @Input()
  public paginate = true;

  @Input()
  public alwaysPaginate = true;

  @Input()
  public rowsPerPageOptions = [10, 20, 50, 100];

  @Input()
  public showCurrentPageReport = true;

  @Input()
  public rows: T[] = [];

  @Input()
  public totalRecords = 0;

  @Input()
  public allowNew = true;

  @Input()
  public scrollable = true;

  @Input()
  public canInsert = false;

  @Input()
  public canUpdate = false;

  @Input()
  public canDelete = false;

  @Input()
  public isModal = false;

  @Input()
  public isSelectable = false;

  @Output()
  public requestDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public selected: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  public requestSearch: EventEmitter<{
    filter: KeyValue<string, unknown>[];
    skip: number;
    take: number;
    sort: SortEvent;
  }> = new EventEmitter();

  @ViewChild('dataTable')
  private dataTable!: Table;

  private filter: KeyValue<string, unknown>[] = [];

  private sort: SortEvent = {
    field: undefined,
    order: 1,
  };

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    if (this.actions) this.cols.unshift({ field: 'actions', header: 'Ações' });
  }

  public getTextAlign(col: IColumn): string | null {
    const classes = col?.options?.classes ?? '';

    if (classes.includes('text-center')) return 'center';
    if (classes.includes('text-right')) return 'right';
    if (classes.includes('text-left')) return 'left';

    return null;
  }

  public getBoolIcon(value: boolean): string {
    return value ? 'pi pi-check' : 'pi pi-times';
  }

  public getTotalRecords(): string {
    return `{first} - {last} de ${this.totalRecords}`;
  }

  public getDefaultFilterPlaceholder(col: IColumn): string {
    return `Pesquisar por ${col.header}`;
  }

  private generateFilterKey(key: string, matchMode: string): string {
    return `${key}_${matchMode}`;
  }

  private isValidValue(value: unknown): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  private buildRequestFilter(
    filters: { [s: string]: FilterMetadata[] | undefined } | undefined,
  ): void {
    this.filter = [];
    if (filters) {
      for (const [key, field] of Object.entries(filters)) {
        field?.forEach((filter) => {
          const keyValue: KeyValue<string, unknown> = {
            key: this.generateFilterKey(key, filter.matchMode as string),
            value: filter?.value,
          };

          if (this.isValidValue(keyValue.value)) this.filter.push(keyValue);
        });
      }
    }
  }

  public clear(table: Table): void {
    table.clear();
    this.filter = [];
    this.sort = { field: undefined, order: 1 };
    this.onFilter();
  }

  public onPage($event: TableLazyLoadEvent): void {
    this.requestSearch.emit({
      filter: this.filter,
      skip: $event.first as number,
      take: $event.rows as number,
      sort: this.sort,
    });
  }

  public onFilter($event?: TableFilterEvent): void {
    if ($event) {
      this.buildRequestFilter(
        $event.filters as { [s: string]: FilterMetadata[] | undefined } | undefined,
      );
    }

    this.requestSearch.emit({
      filter: this.filter,
      skip: 0,
      take: (this.dataTable?.rows as number) ?? this.rowsPerPageOptions[0],
      sort: this.sort,
    });
  }

  public onSort({ field, order }: SortEvent): void {
    if (!this.sort.field || field !== this.sort.field) {
      this.sort.field = field;
      this.sort.order = order;
    } else {
      this.sort.order = this.sort.order === 1 ? -1 : 1;
      if (this.sort.order === 1) this.sort.field = undefined;
    }

    this.dataTable.sortField = this.sort.field;
    this.dataTable.sortOrder = this.sort.order as number;
    this.onFilter();
  }

  public onSelect(item: T): void {
    this.selected.emit(item);
  }
}
