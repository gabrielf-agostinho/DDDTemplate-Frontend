import { Injectable } from '@angular/core';
import { HttpService } from '../../core/api/http.service';
import { Observable } from 'rxjs';
import { Pagination } from '../../core/models/Pagination.model';
import { KeyValue } from '@angular/common';
import { buildQueryParams } from '../../core/api/query-builder';
import { SortEvent } from 'primeng/api';

@Injectable()
export abstract class BaseService<TGetDTO, TPostDTO, TPutDTO> {
  protected abstract module: string;

  constructor(protected http: HttpService) {}

  public getAllPaged(
    queryParams: KeyValue<string, unknown>[] = [],
    skip?: number,
    take?: number,
    sort?: SortEvent,
  ): Observable<Pagination<TGetDTO>> {
    const params = [...queryParams];

    params.push({ key: 'skip', value: skip });
    params.push({ key: 'take', value: take });
    params.push({ key: 'order_by_field', value: sort?.field });
    params.push({ key: 'order_by_direction', value: sort?.order });

    const query = buildQueryParams(params);

    return this.http.get<Pagination<TGetDTO>>(`${this.module}/${query}`);
  }

  public getAll(): Observable<TGetDTO[]> {
    return this.http.get<TGetDTO[]>(`${this.module}`);
  }

  public getById(id: string): Observable<TGetDTO> {
    return this.http.get<TGetDTO>(`${this.module}/${id}`);
  }

  public post(dto: TPostDTO): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.module}`, dto);
  }

  public put(dto: TPutDTO, id: string): Observable<void> {
    return this.http.put<void>(`${this.module}/${id}`, dto);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.module}/${id}`);
  }
}
