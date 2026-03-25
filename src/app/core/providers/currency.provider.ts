import { DEFAULT_CURRENCY_CODE, ValueProvider } from "@angular/core"

export const provideCurrency = (): ValueProvider => {
  return {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
  }
};