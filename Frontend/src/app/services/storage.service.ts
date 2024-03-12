import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  readonly logger = inject(LoggerService);

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }
}
