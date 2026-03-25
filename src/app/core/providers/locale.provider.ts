import { LOCALE_ID, ValueProvider } from "@angular/core"

export const provideLocale = (): ValueProvider => {
  return {
    provide: LOCALE_ID,
    useValue: 'pt'
  }
};