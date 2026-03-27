import { FormField } from "../../shared/forms/FormField.type";

export type FormFieldsOf<T> = {
  [K in keyof T]: FormField<T[K]>;
};