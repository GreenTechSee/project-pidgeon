
import { render, screen, waitFor } from '@testing-library/angular';
import { TestComponent } from './test.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

class TranslateLoaderMock implements TranslateLoader {
  getTranslation() {
    return of({
      'test': 'This is a test'
    });
  }
}

describe('TestComponent', () => {

  it('should render test', async () => {
    await render(TestComponent, {
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderMock },
          isolate: false,
          defaultLanguage: 'en',
          useDefaultLang: true,
        })
      ],
      providers: [
        TranslateService
      ]
    });

    await waitFor(() => {
      expect(screen.getByText('This is a test')).toBeTruthy();
    })

  })
});
