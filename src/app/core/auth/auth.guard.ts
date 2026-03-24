import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "./session.service";

export const AUTH_GUARD: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.isLogged) {
    router.navigate(['/login']);
    return false;
  }

  return true;
}