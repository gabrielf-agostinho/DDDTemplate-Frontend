import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { Pagination } from "../models/Pagination.model";
import { KeyValue } from "@angular/common";
import { buildQueryParams } from "./query-builder";

@Injectable()
export abstract class BaseService<T> {
  protected abstract module: string;

  constructor(
    protected http: HttpService) { }

  public getAllPaged(
    queryParams: KeyValue<string, unknown>[] = [],
    skip?: number,
    take?: number
  ): Observable<Pagination<T>> {
    const params = [...queryParams];

    params.push({ key: 'skip', value: skip });
    params.push({ key: 'take', value: take });

    const query = buildQueryParams(params);

    return this.http.get<Pagination<T>>(`${this.module}/${query}`)
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.module}`)
  }

  public getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.module}/${id}`)
  }

  public post(dto: T): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.module}`, dto)
  }

  public put(dto: T, id: string): Observable<void> {
    return this.http.put<void>(`${this.module}/${id}`, dto)
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.module}/${id}`)
  }
}