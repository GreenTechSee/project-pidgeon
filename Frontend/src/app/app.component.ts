import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TestComponent } from "./pages/test/test.component";
import { PrimeNGConfig } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingService } from './services/loading.service';
import { delay } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoggerService } from './services/logger.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      RouterOutlet, 
      TestComponent, 
      ProgressSpinnerModule, 
      TopbarComponent, 
      SidebarComponent,
      TranslateModule,
      SelectButtonModule
    ]
})
export class AppComponent implements OnInit {
  title = 'Peak Pidgon';
  userLanguage = 'no';
  loading = signal(true);
  isLoggedIn: WritableSignal<boolean> = signal(false);
  langOptions: any[];

  constructor(
    private primengConfig: PrimeNGConfig,
    private tr: TranslateService,
    private _loading: LoadingService,
    private logger: LoggerService,
    private router: Router,
  ) { this.langOptions = [{language: 'Norsk'}, {language: 'English'}]}

  async ngOnInit(): Promise<void> {
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

  navigateToHome() {
    this.router.navigate(['/']);
  }

  async setLanguage(value: { language: string }) {
    if (!value) {
      return;
    }
    this.logger.log('Retrieved lang value:', value);
    const languageMap: { [key: string]: string } = {
      "English": "en",
      "Norsk": "no"
    };
    const languageCode = languageMap[value.language] || "en";
    this.userLanguage = languageCode;
    this.tr.use(languageCode);
    this.logger.log('Language set to:', languageCode);
    this.logger.log('defaultLang:', this.tr.getDefaultLang())
  }
}
