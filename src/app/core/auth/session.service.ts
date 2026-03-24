import { Injectable } from "@angular/core";
import { TokenStorageService } from "../services/token-storage.service";
import { BehaviorSubject, Observable } from "rxjs";
import { UserToken } from "../models/User-Token.model";

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _token: BehaviorSubject<UserToken | null> = new BehaviorSubject<UserToken | null>(null);
  public token$: Observable<UserToken | null> = this._token.asObservable();

  constructor(private _tokenStorageService: TokenStorageService) {
    const token = _tokenStorageService.getToken();

    if (token)
      this._token.next(token);
  }

  public setSession(token: UserToken): void {
    this._tokenStorageService.setToken(token);
    this._token.next(token);
  }

  public clearSession(): void {
    this._tokenStorageService.removeToken();
    this._token.next(null);
  }

  public get token(): UserToken | null {
    return this._token.value;
  }

  public get isLogged(): boolean {
    return !!this._token.value;
  }
}