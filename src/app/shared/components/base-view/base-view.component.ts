import { Component, OnInit, signal } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { first } from 'rxjs';
import { IColumn } from '../../interfaces/data-table/IColumn';
import { KeyValue } from '@angular/common';
import { SortEvent } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-base-view',
  template: '',
})
export abstract class BaseViewComponent<TGetDTO, TPostDTO, TPutDTO> implements OnInit {
  public abstract cols: IColumn[];

  protected items = signal<TGetDTO[]>([]);

  constructor(protected service: BaseService<TGetDTO, TPostDTO, TPutDTO>) {}

  public ngOnInit(): void {
    this.search();
  }

  protected search(
    queryParams: KeyValue<string, unknown>[] = [],
    skip = 0,
    take = 10,
    sort?: SortEvent
  ): void {
    this.service
      .getAllPaged(queryParams, skip, take)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.items.set(response.list);
        },
      });
  }
}
