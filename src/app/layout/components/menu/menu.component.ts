import { Component, Input } from "@angular/core";
import { MenuItem } from "primeng/api";
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-menu',
  styleUrl: './menu.component.scss',
  template: `
    @if (visible) {
      <p-panelmenu [model]="items" class="menu"></p-panelmenu>
    }
  `,
  standalone: true,
  imports: [PanelMenuModule],
})
export class MenuComponent {
  @Input()
  public visible: boolean = true;

  public items: MenuItem[] = [{
    label: 'teste'
  }];
}