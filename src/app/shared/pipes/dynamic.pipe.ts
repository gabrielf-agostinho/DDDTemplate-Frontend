/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injector, Pipe, PipeTransform } from '@angular/core';
import { PIPES_MAP } from './pipes.map';

@Pipe({
  standalone: true,
  name: 'dynamic',
})
export class DynamicPipe implements PipeTransform {
  constructor(private injector: Injector) {}

  transform(value: any, pipeName: string, ...args: any[]): any {
    if (!pipeName) return value;

    try {
      const pipeInstance = this.injector.get<any>(
        PIPES_MAP.find((pipe) => pipe.key === pipeName)?.value as any,
      );
      return pipeInstance.transform(value, ...args);
    } catch (e) {
      console.log(e);
      console.warn(`Pipe ${pipeName} não encontrado`);
      return value;
    }
  }
}
