import { Component } from '@angular/core';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form.component';
import { UserGetDTO, UserPostDTO, UserPutDTO } from '../../../../shared/models/DTOs/users/user.dto';
import { UsersService } from '../../services/users.service';
import { UserFormPost, UserFormPut } from '../../models/User.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormHeaderComponent],
  template: `
    <app-form-header
      [method]="method"
      [canSave]="canSave()"
      (onCancel)="cancel()"
      (onSave)="save()"
      (setAsEditMode)="setEditMode()"
    ></app-form-header>
  `,
})
export class UserFormPage extends BaseFormComponent<UserGetDTO, UserPostDTO, UserPutDTO> {
  constructor(private _usersService: UsersService) {
    super(_usersService);
  }

  protected override createViewForm(): void {
    this.form = UserFormPut.createForm();
  }

  protected override createEditForm(): void {
    this.form = UserFormPut.createForm();
  }

  protected override createNewForm(): void {
    this.form = UserFormPost.createForm();
  }
}
