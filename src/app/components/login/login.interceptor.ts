import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LoginService } from './';
import { catchError, delay, finalize, Observable, of } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { Router } from '@angular/router';
const TOKEN_HEADER_KEY = 'Authorization'; 
@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(
    private token: LoginService,
    private loaderService: LoaderService,
    public router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    this.requests.push(req);
    let loginReq = req;
    //console.log(loginReq.url);
    const token = this.token.GetTokenString();
    if (token != "") {
      loginReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      
    }
    
    return next.handle(loginReq).pipe(
      catchError((error: any) => {
        if (error.status == 401 || error.status == 0) {
          this.router.navigate(['/login']);
        } else {
        }
        return of(error)
      }),
      finalize(() => {
        this.loaderService.hide();
      }),
    );
  }
}
export const LoginInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true }
];