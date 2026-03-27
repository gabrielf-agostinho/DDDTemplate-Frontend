import { Injectable } from "@angular/core";
import { AuthService } from "../../../core/auth/auth.service";
import { Observable } from "rxjs";
import { UserToken } from "../../../core/models/User-Token.model";
import { LoginDTO } from "../models/login.dto";

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private _authService: AuthService) { }

  public login(dto: LoginDTO): Observable<UserToken> | null {
    if (dto.email && dto.password)
      return this._authService.auth(dto.email, dto.password);

    return null;
  };
}