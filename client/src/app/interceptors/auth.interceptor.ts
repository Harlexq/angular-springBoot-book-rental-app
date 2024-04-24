import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token =
      localStorage.getItem('adminUserToken') ||
      localStorage.getItem('webUserToken');

    let newRequest = request.clone({
      headers: request.headers.set('Authentication', `Bearer ${token}`),
    });

    return next.handle(newRequest);
  }
}
