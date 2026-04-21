import { Validators } from '@angular/forms';
import { FormModel } from '../../../shared/forms/form.model';
import { FormFieldsOf } from '../../../shared/forms/FormFieldsOf.type';
import { UserPostDTO, UserPutDTO } from '../../../shared/models/DTOs/users/user.dto';

export class UserFormPost extends FormModel<UserPostDTO> {
  public email: string | undefined;
  public password: string | undefined;

  public static formFields: FormFieldsOf<UserPostDTO> = {
    email: {
      id: 'email',
      label: 'Email',
      placeholder: 'email@email.com',
      validators: [Validators.email, Validators.required],
    },
    password: {
      id: 'password',
      label: 'Senha',
      placeholder: '••••••••',
      validators: [Validators.required],
    },
    name: {
      id: 'name',
      label: 'Nome',
      placeholder: 'Nome Completo',
      validators: [Validators.required],
    },
     isActive: {
      id: 'isActive',
      label: 'Ativo',
    }
  };

  protected override formFields = UserFormPost.formFields;
}

export class UserFormPut extends FormModel<UserPutDTO> {
  public email: string | undefined;;

  public static formFields: FormFieldsOf<UserPutDTO> = {
    email: {
      id: 'email',
      label: 'Email',
      placeholder: 'email@email.com',
      validators: [Validators.email, Validators.required],
    },
    name: {
      id: 'name',
      label: 'Nome',
      placeholder: 'Nome Completo',
      validators: [Validators.required],
    },
     isActive: {
      id: 'isActive',
      label: 'Ativo',
    }
  };

  protected override formFields = UserFormPut.formFields;
}
