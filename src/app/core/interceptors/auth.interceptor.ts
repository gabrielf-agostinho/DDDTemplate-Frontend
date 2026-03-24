import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { SessionService } from "../auth/session.service";

export const AUTH_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  const token = sessionService.token;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.accessToken}`
      }
    });
  }

  return next(req);
}