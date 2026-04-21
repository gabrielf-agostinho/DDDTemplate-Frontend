import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { first } from 'rxjs';
import { IColumn } from '../../interfaces/data-table/IColumn';
import { KeyValue } from '@angular/common';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { UserModulesService } from '../../services/user-modules.service';
import { EModule } from '../../enums/module.enum';
import { EMethod } from '../../enums/method.enum';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  standalone: true,
  selector: 'app-base-view',
  template: '',
})
export abstract class BaseViewComponent<TGetDTO, TPostDTO, TPutDTO> implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userModulesService = inject(UserModulesService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly toastService = inject(ToastService);

  private queryParams: KeyValue<string, unknown>[] = [];
  private skip = 0;
  private take = 10;
  private sort?: SortEvent;

  public abstract cols: IColumn[];

  protected canInsert = signal<boolean>(false);
  protected canUpdate = signal<boolean>(false);
  protected canDelete = signal<boolean>(false);

  protected items = signal<TGetDTO[]>([]);

  constructor(protected service: BaseService<TGetDTO, TPostDTO, TPutDTO>) {}

  public ngOnInit(): void {
    this.search();
    this.checkPermissions();
  }

  protected search(
    queryParams: KeyValue<string, unknown>[] = [],
    skip = 0,
    take = 10,
    sort?: SortEvent,
  ): void {
    this.saveParams(queryParams, skip, take, sort);

    this.service
      .getAllPaged(this.queryParams, this.skip, this.take, this.sort)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.items.set(response.list);
        },
      });
  }

  protected onDelete(dto: TGetDTO): void {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-power-off',
      rejectIcon: 'pi pi-undo',
      message: 'Você realmente deseja excluir esse registro?',
      accept: () => {
        this.service
          .delete((dto as unknown as any).id)
          .pipe(first())
          .subscribe({
            next: () => {
              this.search(this.queryParams, this.skip, this.take, this.sort);
              this.toastService.showSuccessToast('Registro excluído com sucesso!');
            }
          });
      },
    });
  }

  protected checkPermissions(): void {
    const module = this.activatedRoute.snapshot.data['module'] as EModule;

    this.checkInsertPermission(module);
    this.checkUpdatePermission(module);
    this.checkDeletePermission(module);
  }

  protected checkInsertPermission(module: EModule): void {
    this.userModulesService
      .hasModuleAccessWithMethod(module, EMethod.POST)
      .pipe(first())
      .subscribe({
        next: (hasAccess) => this.canInsert.set(hasAccess),
      });
  }

  protected checkUpdatePermission(module: EModule): void {
    this.userModulesService
      .hasModuleAccessWithMethod(module, EMethod.PUT)
      .pipe(first())
      .subscribe({
        next: (hasAccess) => this.canUpdate.set(hasAccess),
      });
  }

  protected checkDeletePermission(module: EModule): void {
    this.userModulesService
      .hasModuleAccessWithMethod(module, EMethod.DELETE)
      .pipe(first())
      .subscribe({
        next: (hasAccess) => this.canDelete.set(hasAccess),
      });
  }

  private saveParams(
    queryParams: KeyValue<string, unknown>[],
    skip: number,
    take: number,
    sort?: SortEvent,
  ): void {
    this.queryParams = queryParams;
    this.skip = skip;
    this.take = take;
    this.sort = sort;
  }
}
