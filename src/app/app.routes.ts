import { Routes } from '@angular/router';
import { GUEST_GUARD } from './core/auth/guest.guard';
import { AUTH_GUARD } from './core/auth/auth.guard';
import { MODULE_GUARD } from './shared/guards/module.guard';
import { EModule } from './shared/enums/module.enum';

export const ROUTES: Routes = [
  {
    path: 'login',
    canMatch: [GUEST_GUARD],
    loadChildren: () => import('./features/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    canMatch: [GUEST_GUARD],
    loadChildren: () =>
      import('./features/register/register.routes').then((m) => m.REGISTER_ROUTES),
  },
  {
    path: '',
    canMatch: [AUTH_GUARD],
    loadComponent: () =>
      import('./layout/base-layout.component').then((m) => m.BaseLayoutComponent),
    children: [
      {
        path: 'usuarios',
        data: { module: EModule.USERS },
        canMatch: [MODULE_GUARD],
        loadChildren: () => import('./features/users/users.routes').then((m) => m.USER_ROUTES),
      },
    ],
  },
];
