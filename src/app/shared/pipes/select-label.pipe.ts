/* eslint-disable @angular-eslint/prefer-standalone */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'selectLabel',
})
export class SelectLabelPipe implements PipeTransform {
  transform(
    value: unknown,
    options?: { id?: number | null; description: string }[]
  ): string {
    if (!options || options.length === 0) return String(value ?? '');
    const opt = options.find((o) => o.id == value);
    return opt ? opt.description : String(value ?? '');
  }
}