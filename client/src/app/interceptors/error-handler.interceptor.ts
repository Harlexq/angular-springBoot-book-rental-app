import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('Bir hata oluştu:', error.error.message);
        } else {
          console.error(
            `HTTP Hatası: ${error.status}, ` + `Detaylar: ${error.message}`
          );
        }
        return throwError('Bir hata oluştu; lütfen tekrar deneyin.');
      })
    );
  }
}
