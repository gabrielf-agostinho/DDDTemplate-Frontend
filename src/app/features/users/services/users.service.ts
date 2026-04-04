import { Injectable } from "@angular/core";
import { BaseService } from "../../../shared/services/base.service";
import { UserGetDTO, UserPostDTO, UserPutDTO } from "../../../shared/models/DTOs/users/user.dto";
import { HttpService } from "../../../core/api/http.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UserGetDTO, UserPostDTO, UserPutDTO> {
  protected override module: string = 'users';

  constructor(private _http: HttpService) {
    super(_http);
  }
}