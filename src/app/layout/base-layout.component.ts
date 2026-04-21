import { Component, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { Data, RouterOutlet } from '@angular/router';
import { fader } from './animations/fader.animation';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from './services/breadcrumb.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    DrawerModule,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    RouterOutlet,
    BreadcrumbModule,
  ],
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
      <div class="mb-5">
        @if (breadcrumbs().length > 1) {
          <p-breadcrumb [model]="breadcrumbs()" [home]="home" />
        }
      </div>
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
  private breadcrumbService = inject(BreadcrumbService);

  breadcrumbs = toSignal(this.breadcrumbService.breadcrumbs$, { initialValue: [] });

  public menuVisible: boolean = false;

  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  public onToggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  public prepareRoute(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData;
  }
}
