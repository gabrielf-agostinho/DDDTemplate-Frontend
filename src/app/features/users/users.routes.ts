import { Routes } from "@angular/router";
import { ACTION_GUARD } from "../../shared/guards/action.guard";
import { EMethod } from "../../shared/enums/method.enum";

export const USER_ROUTES: Routes = [
  {
    path: '',
    data: { method: EMethod.GET },
    canActivate: [ACTION_GUARD],
    loadComponent: () => import('./pages/view/user-view.page').then(p => p.UserViewPage)
  },
  {
    path: 'novo',
    data: { method: EMethod.POST },
    canActivate: [ACTION_GUARD],
    loadComponent: () => import('./pages/form/user-form.page').then(p => p.UserFormPage)
  },
  {
    path: ':id',
    data: { method: EMethod.GET },
    canActivate: [ACTION_GUARD],
    loadComponent: () => import('./pages/form/user-form.page').then(p => p.UserFormPage)
  },
  {
    path: ':id/editar',
    data: { method: EMethod.PUT },
    canActivate: [ACTION_GUARD],
    loadComponent: () => import('./pages/form/user-form.page').then(p => p.UserFormPage)
  }
];