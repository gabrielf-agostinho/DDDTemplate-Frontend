import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorHandlerService } from "../services/error-handler.service";
import { catchError } from "rxjs";

export const ERROR_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((errorResponse) => errorHandler.handle(errorResponse))
  );
};