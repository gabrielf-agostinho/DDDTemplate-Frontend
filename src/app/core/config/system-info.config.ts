import { InjectionToken } from "@angular/core";
import { SystemInfo } from "../models/SystemInfo.model";

export const SYSTEM_INFO = new InjectionToken<SystemInfo>('SYSTEM_INFO');