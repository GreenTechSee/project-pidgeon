import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  readonly #logger = inject(LoggerService);

  public handleError(error: HttpErrorResponse): void {
    const e = error.error.message || error.statusText;
    if (error.error instanceof ErrorEvent) {
      this.#logger.error('An error occurred:', error.error.message);
    } else {
      this.#logger.error(
        `Backend returned code ${error.status}, ` +
        `error: ${e}, ` +
        `body: ${error.error}`);
        this.handleServerError(error);
    }
  }

  private handleServerError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 401:
        this.#logger.warn('Unauthorized');
        break;
      case 403:
        this.#logger.warn('Forbidden');
        break;
      case 404:
        this.#logger.warn('Not Found');
        break;
      case 500:
        this.#logger.warn('Internal Server Error');
        break;
      default:
        this.#logger.warn('Unknown Error');
        break;
    }
  }
}
