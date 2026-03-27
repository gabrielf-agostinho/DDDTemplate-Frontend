import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { SessionService } from "./session.service";

export const GUEST_GUARD: CanMatchFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isLogged)
    return router.createUrlTree(['/']);

  return true;
}