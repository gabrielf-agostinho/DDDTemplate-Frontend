import { Injectable } from "@angular/core";

@Injectable({ 
  providedIn: 'root' 
})
export class DateUtils {
  public get currentYear(): number {
    return new Date().getFullYear();
  }
}