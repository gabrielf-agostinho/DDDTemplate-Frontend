import { Injectable } from "@angular/core";
import { HttpService } from "../api/http.service";
import { SessionService } from "./session.service";
import { Observable, tap } from "rxjs";
import { UserToken } from "../models/User-Token.model";
import { ApiRequestOptions } from "../models/ApiRequestOptions.model";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _httpService: HttpService,
    private _sessionService: SessionService
  ) { }

  public auth(email: string, password: string): Observable<UserToken> {
    return this._httpService.post<UserToken>('auth', { email, password })
      .pipe(
        tap(token => this._sessionService.setSession(token))
      );
  }

  public register(name: string, email: string, password: string): Observable<void> {
    return this._httpService.post<void>('auth/register', { name, email, password });
  }

  public refresh(refreshToken: string): Observable<UserToken> {
    const options: ApiRequestOptions = {
      headers: new HttpHeaders({ 'refreshToken': refreshToken })
    };

    return this._httpService.post<UserToken>('auth/refresh', null, options)
      .pipe(
        tap(token => this._sessionService.setSession(token))
      );
  }

  public currentUser<T>() {
    return this._httpService.get<T>('auth/current-user');
  }

  public passwordReset(oldPassword: string, newPassword: string) {
    return this._httpService.patch('auth/password-reset', { oldPassword, newPassword });
  }

  public logout(): void {
    this._sessionService.clearSession();
  }
}