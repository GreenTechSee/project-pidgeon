import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  #withDate(message: string): string {
    return new Date().toLocaleTimeString() + ' - ' + message;
  }

  log(message: string, ...optionalParams: unknown[]): void {
    if (!isDevMode()) return;
    console.log(this.#withDate(message), ...optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    if (!isDevMode()) return;
    console.warn(this.#withDate(message), ...optionalParams);
    
  }

  error(message: string, ...optionalParams: unknown[]): void {
    if (!isDevMode()) return;
    console.error(this.#withDate(message), ...optionalParams);
  }
}
