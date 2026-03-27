import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LoginDTO } from "../models/login.dto";
import { LoginForm } from "../models/login.form";

@Component({
  selector: 'app-login-form',
  templateUrl: './login.form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
],
})
export class LoginFormComponent {
  public formFields = LoginForm.formFields;
  public emailField = this.formFields.email;
  public passwordField = this.formFields.password;

  public formGroup: FormGroup = LoginForm.createForm();

  @Input()
  public showPasswordRecoveryLink: boolean = true;

  @Output()
  private submitForm = new EventEmitter<LoginDTO>();

  public submit(): void {
    this.submitForm.emit(this.formGroup.getRawValue() as LoginDTO);
  }
}