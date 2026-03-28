import { Component } from "@angular/core";
import { RegisterFormComponent } from "../components/register.form.component";
import { RegisterService } from "../services/register.service";
import { first } from "rxjs";
import { UserPostDTO } from "../../../shared/models/DTOs/users/user.dto";
import { DateUtils } from "../../../shared/utils/date.utils";
import { Router } from "@angular/router";
import { ToastService } from "../../../core/services/toast.service";

@Component({
  standalone: true,
  templateUrl: `./register.page.html`,
  imports: [RegisterFormComponent],
})
export class RegisterPage {
  constructor(
    public dateUtils: DateUtils,
    private _registerService: RegisterService,
    private _toastService: ToastService,
    private _router: Router
  ) { }

  public onSubmit(dto: UserPostDTO): void {
    this._registerService.register(dto).pipe(first()).subscribe({
      next: () => {
        this._toastService.showSuccessToast('Usuário criado com sucesso. Realize o login para continuar.');
        this._router.navigate(['/login']);
      }
    });
  }
}
