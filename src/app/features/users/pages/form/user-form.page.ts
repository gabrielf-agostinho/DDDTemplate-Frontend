import { Component } from '@angular/core';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form.component';
import { UserGetDTO, UserPostDTO, UserPutDTO } from '../../../../shared/models/DTOs/users/user.dto';
import { UsersService } from '../../services/users.service';
import { UserFormPost, UserFormPut } from '../../models/User.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  template: '',
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
