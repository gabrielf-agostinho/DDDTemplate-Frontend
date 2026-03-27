import { ValidatorFn } from "@angular/forms";

export type FormField<T> = {
  id?: string;
  validators?: ValidatorFn[];
  label?: string;
  type?: string;
  placeholder?: string;
};