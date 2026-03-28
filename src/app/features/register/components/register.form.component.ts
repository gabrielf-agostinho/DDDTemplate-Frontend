import { Component, EventEmitter, inject, Output } from "@angular/core";
import { RegisterForm } from "../models/register.form";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IftaLabelModule } from "primeng/iftalabel";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { UserPostDTO } from "../../../shared/models/DTOs/users/user.dto";
import { Router } from "@angular/router";
import { ToastService } from "../../../core/services/toast.service";

@Component({
  standalone: true,
  selector: 'app-register-form',
  templateUrl: `./register.form.component.html`,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule
  ],
})
export class RegisterFormComponent {
  private _router: Router = inject(Router);
  private _toastService: ToastService = inject(ToastService);

  public formFields = RegisterForm.formFields;
  public nameField = this.formFields.name;
  public emailField = this.formFields.email;
  public passwordField = this.formFields.password;

  public passwordConfirmation?: string;

  public formGroup: FormGroup = RegisterForm.createForm();

  @Output()
  private submitForm = new EventEmitter<UserPostDTO>();

  public submit(): void {
    if (this.formGroup.get(this.passwordField.id!)?.value !== this.passwordConfirmation)
      return this._toastService.showWarningToast('As senhas informadas não são iguais.');

    this.submitForm.emit(this.formGroup.getRawValue() as UserPostDTO);
  }

  public gotoLogin(): void {
    this._router.navigate(['/login']);
  }

  public shouldDisable(): boolean {
    return this.formGroup.invalid || !this.passwordConfirmation;
  }
}