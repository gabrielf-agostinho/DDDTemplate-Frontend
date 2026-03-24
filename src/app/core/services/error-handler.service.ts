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

    const isBackendResponse = (err: any): err is Response<unknown> => err && typeof err.success === 'boolean' && 'code' in err;

    if (!navigator.onLine) {
      this._toastService.showErrorToast('Você está sem conexão com a internet.');
      return throwError(() => error);
    }

    if (isBackendResponse(error)) {
      if (error.success === false && error.code)
        this.showToastByCode(error);
      return throwError(() => error);
    }

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