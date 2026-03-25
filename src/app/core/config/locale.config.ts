import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { registerLocaleData } from "@angular/common";

export const configLocale = (): void => registerLocaleData(localePt, 'pt', localePtExtra);
