import { Component, ViewChild } from "@angular/core";
import { DrawerModule } from "primeng/drawer";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    DrawerModule,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    RouterOutlet
  ],
  template: `
    <app-header (toggleMenu)="onToggleMenu()"></app-header>
    <aside>
      <p-drawer [(visible)]="menu.visible">
        <app-menu #menu></app-menu>
      </p-drawer>
    </aside>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer class="absolute bottom-4 text-center w-full text-surface-600 dark:text-surface-400"></app-footer>
  `
})
export class BaseLayoutComponent {
  @ViewChild('menu')
  public menu!: MenuComponent;

  public onToggleMenu(): void {
    this.menu.visible = !this.menu.visible;
  }
}