import { CanActivateFn } from "@angular/router";
import { EMethod } from "../enums/method.enum";
import { UserModulesService } from "../services/user-modules.service";
import { inject } from "@angular/core";
import { EModule } from "../enums/module.enum";
import { firstValueFrom } from "rxjs";

export const ACTION_GUARD: CanActivateFn = async (route) => {
  const userModuleService = inject(UserModulesService);
  const module: EModule = route.data?.['module'];
  const method: EMethod = route.data?.['method'];

  return await firstValueFrom(userModuleService.hasModuleAccessWithMethod(module, method));
}