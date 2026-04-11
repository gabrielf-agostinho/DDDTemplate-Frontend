import { Component } from '@angular/core';
import { BaseViewComponent } from '../../../../shared/components/base-view/base-view.component';
import { UserGetDTO, UserPostDTO, UserPutDTO } from '../../../../shared/models/DTOs/users/user.dto';
import { UsersService } from '../../services/users.service';
import { IColumn } from '../../../../shared/interfaces/data-table/IColumn';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  template: `
    <app-data-table
      [rows]="items()"
      [totalRecords]="items().length"
      [cols]="cols"
      (requestSearch)="search($event.filter, $event.skip, $event.take, $event.sort)"
    ></app-data-table>
  `,
  imports: [DataTableComponent],
})
export class UserViewPage extends BaseViewComponent<UserGetDTO, UserPostDTO, UserPutDTO> {
  override cols: IColumn[] = [
    {
      field: 'name',
      header: 'Nome',
      options: { classes: 'text-center', filter: { type: 'text' } },
    },
    {
      field: 'email',
      header: 'Email',
      options: { classes: 'text-center', filter: { type: 'text' } },
    },
    {
      field: 'isActive',
      header: 'Ativo',
      options: {
        classes: 'text-center',
        value: { useCheckIcon: true },
        filter: { type: 'boolean' },
      },
    },
  ];

  constructor(private _usersService: UsersService) {
    super(_usersService);
  }
}
