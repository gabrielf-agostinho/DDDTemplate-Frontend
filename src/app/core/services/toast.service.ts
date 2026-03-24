import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { ToastType } from "../types/Toast.type";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _messageService: MessageService) { }

  public showToast(
    type: ToastType,
    title: string,
    message: string,
    sticky = false
  ) {
    this._messageService.add({
      severity: type,
      summary: title,
      detail: message,
      sticky: sticky,
    });
  }

  public showSuccessToast(message: string): void {
    this.showToast('success', 'Sucesso!', message);
  }

  public showErrorToast(error: string): void {
    this.showToast('error', 'Erro!', error);
  }

  public showInfoToast(message: string): void {
    this.showToast('info', 'Aviso!', message);
  }

  public showWarningToast(message: string): void {
    this.showToast('warn', 'Atenção!', message);
  }
}