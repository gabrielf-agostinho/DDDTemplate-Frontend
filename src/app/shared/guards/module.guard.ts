import { CanMatchFn } from "@angular/router";
import { inject } from "@angular/core";
import { UserModulesService } from "../services/user-modules.service";
import { EModule } from "../enums/module.enum";
import { firstValueFrom } from "rxjs";

export const MODULE_GUARD: CanMatchFn = async (route) => {
  const userModuleService = inject(UserModulesService);
  const module: EModule = route.data?.['module'];
  
  return await firstValueFrom(userModuleService.hasModuleAccess(module));
}