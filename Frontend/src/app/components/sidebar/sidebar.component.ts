import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { TranslateModule } from '@ngx-translate/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  icon: string;
  label: string;
  route?: Route;
  nestedItems?: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule, RippleModule, StyleClassModule, TranslateModule, RouterLinkActive, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userRole: number = 6;
  sidebarItems: SidebarItem[] = [
    { icon: 'pi pi-home', label: 'Dashboard', route: { path: 'dashboard' } },
    {
      icon: 'pi pi-chart-line',
      label: 'Test',
      nestedItems: [
        { icon: 'pi pi-chart-line', label: 'Test 1', route: {} },
        { icon: 'pi pi-table', label: 'Test 2', route: {} },
      ]
    },
  ]

  constructor() { }

}
