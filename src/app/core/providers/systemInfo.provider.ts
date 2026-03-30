import { ValueProvider } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { SYSTEM_INFO } from "../config/system-info.config";

export const provideSystemInfo = (): ValueProvider => {
  return {
    provide: SYSTEM_INFO,
    useValue: environment.systemInfo
  }
};