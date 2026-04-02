import { Injectable } from "@angular/core";
import { HttpService } from "../../core/api/http.service";
import { Observable } from "rxjs";
import { ModuleGetDTO } from "../models/DTOs/modules/module.dto";
import { BaseService } from "./base.service";
import { UserModulesGetDTO, UserModulesPostDTO, UserModulesPutDTO } from "../models/DTOs/userModules/userModules.dto";

@Injectable({
  providedIn: 'root'
})
export class UserModulesService extends BaseService<UserModulesGetDTO, UserModulesPostDTO, UserModulesPutDTO> {
  protected override module: string = 'user-modules';

  constructor(private _httpService: HttpService) {
    super(_httpService);
  }

  public getByCurrentUser(): Observable<ModuleGetDTO[]> {
    return this._httpService.get<ModuleGetDTO[]>(`${this.module}/get-by-current-user`);
  }
}