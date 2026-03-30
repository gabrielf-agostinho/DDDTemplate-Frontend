import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [
    ButtonModule,
    TooltipModule
  ],
  template: `
    <p-button
      [rounded]="true"
      [text]="true"
      [icon]="getCurrentThemeIcon()"
      tooltipPosition="left"
      [pTooltip]="getCurrentThemeTooltip()"
      (click)="changeTheme()"
    ></p-button>
  `
})
export class ThemeSwitcherComponent {
  constructor(private _themeService: ThemeService) { }

  public changeTheme(): void {
    this._themeService.changeTheme();
  }

  public getCurrentThemeIcon(): string {
    return this._themeService.isDarkMode()
      ? 'pi pi-sun'
      : 'pi pi-moon';
  }

  public getCurrentThemeTooltip(): string {
    return this._themeService.isDarkMode()
      ? 'Ativar modo claro'
      : 'Ativar modo escuro';
  }
}