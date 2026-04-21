import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { UserModulesService } from '../../services/user-modules.service';
import { EMethod } from '../../enums/method.enum';
import { EModule } from '../../enums/module.enum';
import { first } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-base-form',
  template: '',
})
export abstract class BaseFormComponent<TGetDTO, TPostDTO, TPutDTO> implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly routeSnapshot = this.route.snapshot;
  protected readonly router = inject(Router);
  protected readonly toast = inject(ToastService);
  protected readonly userModulesService = inject(UserModulesService);
  protected readonly formbuilder = inject(FormBuilder);

  protected loading = signal(false);
  protected entity = signal<TGetDTO | null>(null);
  protected canSave = signal(false);

  protected id?: string;
  protected method: EMethod = this.routeSnapshot.data?.['method'] as EMethod;
  protected module: EModule = this.routeSnapshot.data?.['module'] as EModule;

  protected form!: FormGroup;

  constructor(protected service: BaseService<TGetDTO, TPostDTO, TPutDTO>) {}

  public ngOnInit(): void {
    this.resolveMode();
    this.checkPermission();
    this.initForm();
    this.loadById();
  }

  private resolveMode(): void {
    this.method = this.method ?? EMethod.POST;
    this.id = this.routeSnapshot.paramMap.get('id') ?? undefined;
  }

  protected isEdit(): boolean {
    return this.method === EMethod.PUT;
  }

  protected checkPermission(): void {
    const method = this.isEdit() ? EMethod.PUT : EMethod.POST;

    this.userModulesService
      .hasModuleAccessWithMethod(this.module, method)
      .pipe(first())
      .subscribe({
        next: (has) => this.canSave.set(has),
      });
  }

  protected loadById(): void {
    if (!this.id) return;

    this.loading.set(true);

    this.service
      .getById(this.id)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.entity.set(data);
          this.patchForm(data);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.toast.showErrorToast('Erro ao carregar registro');
        },
      });
  }

  protected validateForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.showErrorToast('Formulário inválido. Verifique os campos e tente novamente.');
      throw new Error('Formulário inválido');
    }
  }

  protected setEditMode(): void {
    this.method = EMethod.PUT;
  }

  protected cancel(): void {
    this.patchForm(this.entity()!);
    this.method = EMethod.GET;
  }

  protected save(): void {
    this.validateForm();

    const payload = this.form.getRawValue() as TPostDTO | TPutDTO;

    this.loading.set(true);

    return this.isEdit() ? this.put(payload as TPutDTO) : this.post(payload as TPostDTO);
  }

  protected post(payload: TPostDTO) {
    this.service
      .post(payload)
      .pipe(first())
      .subscribe({
        next: (id: unknown) => {
          this.loading.set(false);
          this.toast.showSuccessToast('Registro criado com sucesso');
          this.afterSave();
        },
        error: () => {
          this.loading.set(false);
          this.toast.showErrorToast('Erro ao criar registro');
        },
      });
  }

  protected put(payload: TPutDTO) {
    this.service
      .put(payload, this.id!)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.toast.showSuccessToast('Registro atualizado com sucesso');
          this.afterSave();
        },
        error: () => {
          this.loading.set(false);
          this.toast.showErrorToast('Erro ao atualizar registro');
        },
      });
  }

  protected afterSave(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  protected initForm(): void {
    switch (this.method) {
      case EMethod.GET:
        this.createViewForm();
        break;
      case EMethod.PUT:
        this.createEditForm();
        break;
      case EMethod.POST:
        this.createNewForm();
        break;
      default:
        this.createNewForm();
    }
  }

  protected abstract createViewForm(): void;
  protected abstract createEditForm(): void;
  protected abstract createNewForm(): void;

  protected patchForm(entity: TGetDTO): void {
    this.form.patchValue(entity as any);
  }
}
