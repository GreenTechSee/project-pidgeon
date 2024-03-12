import { Routes } from '@angular/router';
import { TestComponent } from './pages/test/test.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
export const routes: Routes = [
  { path: 'test', component: TestComponent},
  { path: 'dashboard', component: DashboardComponent },
];
