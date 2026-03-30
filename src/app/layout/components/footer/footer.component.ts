import { Component } from "@angular/core";
import { DateUtils } from "../../../shared/utils/date.utils";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: '<small>©{{ DateUtils.currentYear }}</small>'
})
export class FooterComponent {
  constructor(public DateUtils: DateUtils) { }
}