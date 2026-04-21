import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ROUTES } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideApiUrl } from './core/providers/apiUrl.provider';
import { PRIMENG_CONFIG } from './core/config/primeng.config';
import { provideLocale } from './core/providers/locale.provider';
import { provideCurrency } from './core/providers/currency.provider';
import { configLocale } from './core/config/locale.config';
import { provideHttpCLient } from './core/providers/httpClient.provider';
import { provideMessageService } from './core/providers/messageService.provider';
import { provideSystemInfo } from './core/providers/systemInfo.provider';
import { provideConfirmationService } from './core/providers/confirmationService.provider';

configLocale();

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(ROUTES, withViewTransitions()),
    provideHttpCLient(),
    provideApiUrl(),
    provideLocale(),
    provideCurrency(),
    providePrimeNG(PRIMENG_CONFIG),
    provideMessageService(),
    provideConfirmationService(),
    provideSystemInfo()
  ]
};
