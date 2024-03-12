import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorHandlerService);
  return next(req).pipe(
    catchError((error) => {
      errorService.handleError(error);
      return throwError(() => error);
    })
  );
};
