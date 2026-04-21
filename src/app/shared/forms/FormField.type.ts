import { ValidatorFn } from "@angular/forms";

export type FieldType = 'text' | 'email' | 'password' | 'checkbox';

export type FormField<T> = {
  id?: any;
  validators?: ValidatorFn[];
  label?: string;
  placeholder?: string;
  type?: FieldType;
  col?: number;
};