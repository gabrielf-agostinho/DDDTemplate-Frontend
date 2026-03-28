import { Routes } from "@angular/router";

export const REGISTER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/register.page').then(p => p.RegisterPage)
  }
];