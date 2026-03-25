import { provideHttpClient, withInterceptors } from "@angular/common/http"
import { EnvironmentProviders } from "@angular/core";
import { AUTH_INTERCEPTOR } from "../interceptors/auth.interceptor";
import { ERROR_INTERCEPTOR } from "../interceptors/error.interceptor";
import { REFRESH_TOKEN_INTERCEPTOR } from "../interceptors/refresh-token.interceptor";

export const provideHttpCLient = (): EnvironmentProviders => {
  return provideHttpClient(withInterceptors([
    AUTH_INTERCEPTOR,
    ERROR_INTERCEPTOR,
    REFRESH_TOKEN_INTERCEPTOR
  ]));
};