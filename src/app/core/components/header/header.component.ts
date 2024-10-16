import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
type Theme = 'dark' | 'light' | 'system';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MenuModule,
    ButtonModule,
    ToggleButtonModule,
    FormsModule,
    TooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  #document = inject(DOCUMENT);
  items: MenuItem[] | undefined = [];
  isDarkMode: boolean = false;
  linkElement: HTMLAnchorElement = this.#document.querySelector('#app-theme')!;
  currentIcon: string = '';

  isSystemDark(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;
  }

  getTheme(): Theme {
    const theme =
      (localStorage.getItem('theme') as Theme) ??
      (this.linkElement.href.includes('light') ? 'light' : 'dark');
    return theme;
  }

  setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      this.currentIcon = 'pi pi-moon';
      this.linkElement.href = 'dark-theme.css';
      return;
    }

    if (theme === 'system') {
      const isDarkMode = this.isSystemDark();
      this.currentIcon = 'pi pi-desktop';
      const themeName = isDarkMode ? 'dark' : 'light';
      this.linkElement.href = `${themeName}-theme.css`;
      return;
    }

    this.currentIcon = 'pi pi-sun';
    this.linkElement.href = 'light-theme.css';
  }

  toggleTheme(): void {
    const currentTheme = this.getTheme();
    if (currentTheme === 'light') {
      this.setTheme('dark');
    }
    if (currentTheme === 'dark') {
      this.setTheme('system');
    }
    if (currentTheme === 'system') {
      this.setTheme('light');
    }
  }

  ngOnInit() {
    if (!localStorage.getItem('theme')) {
      this.setTheme('system');
    } else {
      const themeToLoad = this.getTheme();
      this.setTheme(themeToLoad);
    }

    this.items = [
      {
        label: 'Home',
        routerLink: '/',
      },
      {
        label: 'Snap',
        routerLink: '/snap',
      },
    ];
  }
}
