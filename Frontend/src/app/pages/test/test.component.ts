import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ButtonModule, 
    StyleClassModule, 
    TranslateModule, 
    RippleModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  readonly #logger = inject(LoggerService);
  http = inject(HttpClient);
  constructor() {
    this.http.get('https://jsonplaceholder.typicode.com/users')
    .subscribe((res) => {
      this.#logger.log('res:', res);
    });
  }
}
