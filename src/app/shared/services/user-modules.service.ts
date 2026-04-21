import { Injectable } from "@angular/core";
import { HttpService } from "../../core/api/http.service";
import { Observable } from "rxjs";
import { ModuleGetDTO } from "../models/DTOs/modules/module.dto";
import { BaseService } from "./base.service";
import { UserModulesGetDTO, UserModulesPostDTO, UserModulesPutDTO } from "../models/DTOs/userModules/userModules.dto";
import { EModule } from "../enums/module.enum";
import { EMethod } from "../enums/method.enum";

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

  public hasModuleAccess(module: EModule): Observable<boolean> {
    return this._httpService.get<boolean>(`${this.module}/has-module-access/${module}`);
  }

  public hasModuleAccessWithMethod(module: EModule, method: EMethod): Observable<boolean> {
    return this._httpService.get<boolean>(`${this.module}/has-module-access/${module}/${method}`);
  }
}