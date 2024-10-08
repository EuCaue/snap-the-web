import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
type Theme = 'dark' | 'light';

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
    TooltipModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  #document = inject(DOCUMENT);
  items: MenuItem[] | undefined = [];
  isDarkMode: boolean = false;
  linkElement: HTMLAnchorElement = this.#document.querySelector('#app-theme')!;

  isSystemDark(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;
  }

  getTheme(): Theme {
    const theme =
      (localStorage.getItem('theme') as Theme) ??
      (this.linkElement.href.includes('light') ? 'light' : 'dark');
    if (theme === 'dark') {
      this.isDarkMode = true;
    }
    return theme;
  }

  setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      this.isDarkMode = true;
      this.linkElement.href = 'dark-theme.css';
      return;
    }
    this.isDarkMode = false;
    this.linkElement.href = 'light-theme.css';
  }

  toggleTheme(): void {
    const currentTheme = this.getTheme();
    if (currentTheme === 'dark') {
      this.setTheme('light');
    }
    if (currentTheme === 'light') {
      this.setTheme('dark');
    }
  }

  ngOnInit() {
    if (this.isSystemDark() && !localStorage.getItem('theme')) {
      this.setTheme('dark');
      localStorage.removeItem('theme');
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
