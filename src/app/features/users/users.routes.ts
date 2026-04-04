import { Routes } from "@angular/router";
import { ACTION_GUARD } from "../../shared/guards/action.guard";

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/view/user-view.page').then(p => p.UserViewPage)
  },
  {
    path: 'novo',
    canMatch: [ACTION_GUARD('insert')],
    loadComponent: () => import('./pages/form/user-form.page').then(p => p.UserFormPage)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/form/user-form.page').then(p => p.UserFormPage)
  },
  {
    path: 'editar/:id',
    canMatch: [ACTION_GUARD('update')],
    loadComponent: () => import('./pages/form/user-form.page').then(p => p.UserFormPage)
  }
];