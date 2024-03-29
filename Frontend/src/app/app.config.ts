// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationConfig, LOCALE_ID, enableProdMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { loggerInterceptor } from './interceptors/logger.interceptor';
import { MessageService } from 'primeng/api';
import { provideStore } from '@ngrx/store';
import { provideLottieOptions } from 'ngx-lottie';

export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// enableProdMode()

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
    //interceptors here
    withInterceptors([
        spinnerInterceptor,
        errorInterceptor,
        loggerInterceptor
    ])),
    importProvidersFrom(TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
        }
    })),
    { provide: LOCALE_ID, useValue: 'no' },
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    MessageService,
    provideStore()
],
};
