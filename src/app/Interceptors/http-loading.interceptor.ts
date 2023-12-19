import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LoadingIndicatorService } from './loading-indicator.service';
import { LoginService } from '../components/login';
import { Router } from '@angular/router';
const TOKEN_HEADER_KEY = 'Authorization'; 

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    public spinnerHandler: LoadingIndicatorService,
    public router: Router
  ) {}
  private requests: HttpRequest<any>[] = [];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerHandler.handleRequest('plus');
    this.requests.push(request);
    let loginReq = request;
    const token = this.loginService.GetTokenString();
    if (token != "") {
      loginReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      
    }
    return next
      .handle(loginReq).pipe(
        catchError((error: any) => {
          if (error.status == 401 || error.status == 0) {
            this.router.navigate(['/login']);
          } else {
          }
          return of(error)
        }),
        finalize(this.finalize.bind(this))
      );
  }

  finalize = (): void => this.spinnerHandler.handleRequest();
}
