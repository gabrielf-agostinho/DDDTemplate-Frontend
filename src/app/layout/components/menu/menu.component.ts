import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-menu',
  styleUrl: './menu.component.scss',
  template: `<p-panelmenu [model]="items" class="menu"></p-panelmenu>`,
  standalone: true,
  imports: [PanelMenuModule],
})
export class MenuComponent {
  public items: MenuItem[] = [];
}