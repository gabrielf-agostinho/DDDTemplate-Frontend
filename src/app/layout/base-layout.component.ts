import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { Data, RouterOutlet } from '@angular/router';
import { fader } from './animations/fader.animation';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [DrawerModule, HeaderComponent, MenuComponent, FooterComponent, RouterOutlet],
  animations: [fader],
  template: `
    <nav class="p-5">
      <app-header (toggleMenu)="onToggleMenu()"></app-header>
    </nav>
    <aside>
      <p-drawer [(visible)]="menuVisible">
        <app-menu #menu></app-menu>
      </p-drawer>
    </aside>
    <main class="mt-10 px-10">
      <div [@routeAnimations]="prepareRoute(outlet)" class="relative">
        <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </main>
    <app-footer
      class="absolute bottom-4 text-center w-full text-surface-600 dark:text-surface-400"
    ></app-footer>
  `,
})
export class BaseLayoutComponent {
  public menuVisible: boolean = false;

  public onToggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  public prepareRoute(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData;
  }
}
