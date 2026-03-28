import { Validators } from "@angular/forms";
import { FormModel } from "../../../shared/forms/form.model";
import { FormFieldsOf } from "../../../shared/forms/FormFieldsOf.type";
import { UserPostDTO } from "../../../shared/models/DTOs/users/user.dto";

export class RegisterForm extends FormModel<UserPostDTO> {
  public name: string | undefined;
  public email: string | undefined;
  public password: string | undefined;

  public static formFields: FormFieldsOf<UserPostDTO> = {
    isActive: {
      id: 'isActive'
    },
    name: {
      id: 'name',
      label: 'Nome',
      placeholder: 'Nome',
      validators: [Validators.required]
    },
    email: {
      id: 'email',
      label: 'Email',
      placeholder: 'email@email.com',
      validators: [Validators.email, Validators.required]
    },
    password: {
      id: 'password',
      label: 'Senha',
      placeholder: '••••••••',
      validators: [Validators.required]
    }
  };

  protected override formFields = RegisterForm.formFields;
}