import { ValueProvider } from "@angular/core"
import { environment } from "../../../environments/environment.development"
import { API_URL } from "../api/api.config"

export const provideApiUrl = (): ValueProvider => {
  return {
    provide: API_URL,
    useValue: environment
  }
};