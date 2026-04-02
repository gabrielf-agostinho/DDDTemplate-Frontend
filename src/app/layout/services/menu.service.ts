import { Injectable } from "@angular/core";
import { UserModulesService } from "../../shared/services/user-modules.service";
import { MenuItem } from "primeng/api";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private _userModulesService: UserModulesService) { }

  public async buildMenuItems(): Promise<MenuItem[]> {
    const modules = await firstValueFrom(this._userModulesService.getByCurrentUser());

    return modules as MenuItem[];
  }
}