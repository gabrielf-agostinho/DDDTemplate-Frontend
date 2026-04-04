import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { SessionService } from "../auth/session.service";
import { catchError, switchMap, throwError } from "rxjs";
import { EResponseCodes } from "../enums/ResponseCodes.enum";

export const REFRESH_TOKEN_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const session = inject(SessionService);

  if (req.url.includes('/auth/refresh'))
    return next(req);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === EResponseCodes.UNAUTHORIZED && session.token?.refreshToken) {
        return authService.refresh(session.token.refreshToken).pipe(
          switchMap(token => {
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token.accessToken}`
              }
            });
            return next(newReq);
          })
        );
      }

      return throwError(() => error);
    })
  );
}