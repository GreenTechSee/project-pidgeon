import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TestComponent } from "./pages/test/test.component";
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from './services/loading.service';
import { delay } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoggerService } from './services/logger.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TestComponent, ProgressSpinnerModule, TopbarComponent, SidebarComponent]
})
export class AppComponent implements OnInit {
  title = 'Secmap-Guard';
  userLanguage = 'en';
  loading = signal(true);
  isLoggedIn: WritableSignal<boolean> = signal(false);

  constructor(
    private primengConfig: PrimeNGConfig,
    private tr: TranslateService,
    private _loading: LoadingService,
    private logger: LoggerService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/dashboard') {
          this.onDashboardRoute();
        }
      }
    })
    this.primengConfig.ripple = true;
    this.tr.use(this.userLanguage);
    document.documentElement.lang = this.userLanguage;
    this.listenToLoading()
    this.loading.set(false);
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading.set(loading);
      });
  }

  async onDashboardRoute() {
    
  }
}
