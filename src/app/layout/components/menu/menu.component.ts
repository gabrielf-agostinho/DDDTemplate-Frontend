import { Component, OnInit, signal } from "@angular/core";
import { MenuItem } from "primeng/api";
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuService } from "../../services/menu.service";

@Component({
  selector: 'app-menu',
  styleUrl: './menu.component.scss',
  template: `<p-panelmenu [model]="items()" class="menu"></p-panelmenu>`,
  standalone: true,
  imports: [PanelMenuModule],
})
export class MenuComponent implements OnInit {
  public items = signal<MenuItem[]>([]);

  constructor(private _menuService: MenuService) { }

  public async ngOnInit(): Promise<void> {
    const items = await this._menuService.buildMenuItems();
    this.items.set(items);
  }
}