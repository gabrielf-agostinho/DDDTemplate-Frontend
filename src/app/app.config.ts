import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideApiUrl } from './core/providers/apiUrl.provider';
import { PRIMENG_CONFIG } from './core/config/primeng.config';
import { provideLocale } from './core/providers/locale.provider';
import { provideCurrency } from './core/providers/currency.provider';
import { configLocale } from './core/config/locale.config';
import { provideHttpCLient } from './core/providers/httpClient.provider';
import { provideMessageService } from './core/providers/messageService.provider';

configLocale();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpCLient(),
    provideApiUrl(),
    provideLocale(),
    provideCurrency(),
    providePrimeNG(PRIMENG_CONFIG),
    provideMessageService()
  ]
};
