import { FormControl, FormGroup } from "@angular/forms";
import { ControlsOf } from "./controlsOf.type";
import { FormField } from "./FormField.type";
import { FormFieldsOf } from "./FormFieldsOf.type";

export abstract class FormModel<T> {
  protected abstract formFields: FormFieldsOf<T>;

  private createForm(): FormGroup<ControlsOf<T>> {
    const controls = {} as ControlsOf<T>;

    (Object.keys(this.formFields) as Array<keyof T>).forEach(key => {
      const field = this.formFields[key] as FormField<T[typeof key]>;
      const value = (this as any)[key];

      controls[key] = new FormControl(
        value,
        field.validators || []
      ) as ControlsOf<T>[typeof key];
    });

    return new FormGroup(controls);
  }

  public static createForm<T>(this: new () => FormModel<T>): FormGroup<ControlsOf<T>> {
    const instance = new this();
    return instance.createForm();
  }
}