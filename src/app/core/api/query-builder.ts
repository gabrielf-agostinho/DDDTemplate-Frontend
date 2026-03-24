import { KeyValue, ɵnormalizeQueryParams } from "@angular/common";

export function buildQueryParams(params: KeyValue<string, unknown>[] = []): string {
  let queryParams: string = '';

  params.forEach((param, index) => queryParams += `${index > 0 ? '&' : ''}${param.key}=${param.value}`);

  return ɵnormalizeQueryParams(queryParams);
}