import { Injectable } from "@angular/core";
import { ToastService } from "./toast.service";
import { Observable, throwError } from "rxjs";
import { Response } from "../models/Response.model";
import { HttpErrorResponse } from "@angular/common/http";
import { EResponseCodes } from "../enums/ResponseCodes.enum";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private _toastService: ToastService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  public handle(error: Response<unknown> | HttpErrorResponse): Observable<never> {

    if (!navigator.onLine) {
      this._toastService.showErrorToast('Você está sem conexão com a internet.');
      return throwError(() => error);
    }

    if (error instanceof HttpErrorResponse) {
      const backendError = error.error;

      if (backendError?.success === false) {
        this.showToastByCode(backendError);
        return throwError(() => backendError);
      }

      this._toastService.showErrorToast('Erro de comunicação com o servidor.');
      return throwError(() => error);
    }

    if (error.success === false)
      this.showToastByCode(error);

    this._toastService.showErrorToast('Ocorreu um erro inesperado.');
    return throwError(() => error);
  }

  private showToastByCode(response: Response<unknown>): void {
    const defaultError = 'Erro não informado.';

    switch (response.code) {
      case EResponseCodes.UNAUTHORIZED:
        this._toastService.showInfoToast(response.error ?? defaultError);
        this._authService.logout();
        this._router.navigate(['/login']);
        break;
      case EResponseCodes.BAD_REQUEST:
        this._toastService.showWarningToast(response.error ?? defaultError);
        break;
      default:
        this._toastService.showErrorToast(response.error ?? defaultError);
        break;
    }
  }
}