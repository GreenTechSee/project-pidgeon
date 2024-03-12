import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoggerService } from '../services/logger.service';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const loggerService = inject(LoggerService);
  return next(req).pipe(
    tap({
      next: () => loggerService.log('Request sent', req),
      error: () => loggerService.error('Request failed', req),
      complete: () => loggerService.log('Request completed', req)
    })
  );
};
