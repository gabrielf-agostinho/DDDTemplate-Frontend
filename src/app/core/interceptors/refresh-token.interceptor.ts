import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SessionService } from '../auth/session.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { EResponseCodes } from '../enums/ResponseCodes.enum';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<any>(null);

export const REFRESH_TOKEN_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const session = inject(SessionService);

  if (req.url.includes('/auth/refresh')) return next(req);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === EResponseCodes.UNAUTHORIZED && session.token?.refreshToken) {
        if (isRefreshing) {
          return refreshSubject.pipe(
            filter((token) => token != null),
            take(1),
            switchMap((token) => {
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token.accessToken}`,
                },
              });
              return next(newReq);
            }),
          );
        }

        isRefreshing = true;
        refreshSubject.next(null);

        return authService.refresh(session.token.refreshToken).pipe(
          switchMap((token) => {
            isRefreshing = false;
            refreshSubject.next(token);
            session.setSession(token);

            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            });

            return next(newReq);
          }),
          catchError((refreshError) => {
            isRefreshing = false;

            session.clearSession();
            authService.logout();

            return throwError(() => refreshError);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
