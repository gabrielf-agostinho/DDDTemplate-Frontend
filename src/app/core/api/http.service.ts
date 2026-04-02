import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { API_URL } from "./api.config";
import { map, Observable } from "rxjs";
import { Response } from "../models/Response.model";
import { ApiRequestOptions } from "../models/ApiRequestOptions.model";

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private _http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }

  public get apiVersion(): string { return 'v1'; }
  public set apiVersion(version: string) { this.apiVersion = version; }

  public get<T>(url: string, options?: ApiRequestOptions): Observable<T> {
    return this._http.get<Response<T>>(`${this.apiUrl}/${this.apiVersion}/${url}`, options).pipe(
      map(response => this.handleResponse(response))
    );
  }

  public post<T>(url: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this._http.post<Response<T>>(`${this.apiUrl}/${this.apiVersion}/${url}`, body, options).pipe(
      map(response => this.handleResponse(response))
    );
  }

  public put<T>(url: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this._http.put<Response<T>>(`${this.apiUrl}/${this.apiVersion}/${url}`, body, options).pipe(
      map(response => this.handleResponse(response))
    );
  }

  public patch<T>(url: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this._http.patch<Response<T>>(`${this.apiUrl}/${this.apiVersion}/${url}`, body, options).pipe(
      map(response => this.handleResponse(response))
    );
  }

  public delete<T>(url: string, options?: ApiRequestOptions): Observable<T> {
    return this._http.delete<Response<T>>(`${this.apiUrl}/${this.apiVersion}/${url}`, options).pipe(
      map(response => this.handleResponse(response))
    );
  }

  private handleResponse<T>(response: Response<T>): T {
    if (!response.success)
      throw response;

    return response.data as T;
  }
}
