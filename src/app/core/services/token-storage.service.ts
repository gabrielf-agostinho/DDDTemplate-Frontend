import { Injectable } from "@angular/core";
import { UserToken } from "../models/User-Token.model";

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private readonly KEY: string = 'user_token';

  public setToken(token: UserToken): void {
    localStorage.setItem(this.KEY, JSON.stringify(token));
  }

  public getToken(): UserToken | null {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : null;
  }

  public removeToken(): void {
    localStorage.removeItem(this.KEY);
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }
}