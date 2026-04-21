import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FormField } from '../../forms/FormField.type';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { IftaLabelModule } from 'primeng/iftalabel';
import { EMethod } from '../../enums/method.enum';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, CheckboxModule, IftaLabelModule],
})
export class DynamicFormComponent<T> {
  @Input({ required: true })
  public form!: FormGroup;

  @Input({ required: true })
  public method!: EMethod;

  @Input()
  public fields!: Record<string, FormField<T>>;

  public get fieldList() {
    return Object.values(this.fields);
  }

  public readonly(): boolean {
    return this.method === EMethod.GET;
  }

  resolveType(field: FormField<T>): FieldType {
    if (field.type) return field.type;

    if (field.id?.includes('email')) return 'email';
    if (field.id?.includes('password')) return 'password';
    if (field.id?.includes('is') || field.id?.includes('active')) return 'checkbox';

    return 'text';
  }
}
