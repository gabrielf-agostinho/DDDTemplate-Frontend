import { Component } from "@angular/core";
import { LoginDTO } from "../models/login.dto";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { first } from "rxjs";
import { LoginFormComponent } from "../components/login.form.component";
import { DateUtils } from "../../../shared/utils/date.utils";
import { ToastService } from "../../../core/services/toast.service";
import { SvgLoaderComponent } from "../../../shared/components/svg-loader/svg-loader.component";

@Component({
  standalone: true,
  templateUrl: `./login.page.html`,
  imports: [
    LoginFormComponent,
    SvgLoaderComponent
  ],
})
export class LoginPage {
  constructor(
    public dateUtils: DateUtils,
    private _loginService: LoginService,
    private _router: Router,
    private _toastService: ToastService
  ) { }

  public get currentYear(): number {
    return new Date().getFullYear();
  }

  public onSubmit(dto: LoginDTO): void {
    this._loginService.login(dto)?.pipe(first()).subscribe({
      next: () => {
        this._router.navigate(['/']);
        this._toastService.showSuccessToast('Login realizado com sucesso, bem-vindo de volta!');
      }
    });
  }
}