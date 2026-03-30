import { Component, ViewChild } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    RouterOutlet
  ],
  template: `
    <app-header (toggleMenu)="onToggleMenu()"></app-header>
    <app-menu #menu></app-menu>
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