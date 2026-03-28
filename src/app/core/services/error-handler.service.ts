import { Injectable } from "@angular/core";
import { ToastService } from "./toast.service";
import { Observable, throwError } from "rxjs";
import { Response } from "../models/Response.model";
import { HttpErrorResponse } from "@angular/common/http";
import { EResponseCodes } from "../enums/ResponseCodes.enum";

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private _toastService: ToastService) { }

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
    switch (response.code) {
      case EResponseCodes.BAD_REQUEST:
        this._toastService.showWarningToast(response.error ?? 'Erro não informado.');
        break;
      default:
        this._toastService.showErrorToast(response.error ?? 'Erro não informado.');
        break;
    }
  }
}