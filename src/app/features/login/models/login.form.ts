import { Validators } from "@angular/forms";
import { FormModel } from "../../../shared/forms/form.model";
import { FormFieldsOf } from "../../../shared/forms/FormFieldsOf.type";
import { LoginDTO } from "./login.dto";

export class LoginForm extends FormModel<LoginDTO> {
  public email: string | undefined;
  public password: string | undefined;

  public static formFields: FormFieldsOf<LoginDTO> = {
    email: {
      id: 'email',
      label: 'Email',
      placeholder: 'email@email.com',
      validators: [Validators.email, Validators.required]
    },
    password: {
      id: 'password',
      label: 'Password',
      placeholder: '••••••••',
      validators: [Validators.required]
    }
  };

  protected override formFields = LoginForm.formFields;
}