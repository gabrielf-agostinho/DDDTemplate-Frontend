import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { EMethod } from '../../enums/method.enum';

@Component({
  standalone: true,
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  imports: [ButtonModule, TooltipModule],
})
export class FormHeaderComponent {
  @Input({ required: true })
  public method!: EMethod;

  @Input({ required: true })
  public canSave!: boolean;

  @Output()
  public onCancel = new EventEmitter<void>();

  @Output()
  public onSave = new EventEmitter<void>();

  @Output()
  public setAsEditMode = new EventEmitter<void>();

  public isViewMode = () => this.method === EMethod.GET;
  public isEditMode = () => this.method === EMethod.PUT;
  public isNewMode = () => this.method === EMethod.POST;

  constructor(private _router: Router) {}

  public goBack(): void {
    this._router.navigate(['..', { relativeTo: this._router.routerState.root }]);
  }
}
