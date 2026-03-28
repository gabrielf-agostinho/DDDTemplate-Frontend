import { Injectable } from "@angular/core";
import { AuthService } from "../../../core/auth/auth.service";
import { UserPostDTO } from "../../../shared/models/DTOs/users/user.dto";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor(private _authService: AuthService) { }

  public register(dto: UserPostDTO): Observable<void> {
    return this._authService.register(dto.name, dto.email, dto.password);
  }
}