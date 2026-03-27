import { Routes } from '@angular/router';
import { GUEST_GUARD } from './core/auth/guest.guard';

export const routes: Routes = [
  {
    path: 'login',
    canMatch: [GUEST_GUARD],
    loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES)
  },
];
