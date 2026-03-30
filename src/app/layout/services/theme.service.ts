import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public getCurrentTheme(): string {
    const theme = localStorage.getItem('theme');

    if (theme) return theme;

    return document.querySelector('html')?.classList.contains('app-dark')
      ? 'dark'
      : 'light';
  }

  public changeTheme(): void {
    const isDark = document.querySelector('html')?.classList.toggle('app-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  public setTheme(theme: 'dark' | 'light'): void {
    const classList = document.querySelector('html')?.classList;
    if (!classList) return;

    if (theme === 'dark') classList.add('app-dark');
    else classList.remove('app-dark');

    localStorage.setItem('theme', theme);
  }

  public isDarkMode(): boolean {
    return this.getCurrentTheme() === 'dark';
  }

  public isLightMode(): boolean {
    return this.getCurrentTheme() === 'light';
  }
}