import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(req.url);
    let token = localStorage.getItem('token');
    const copiedReq = req.clone({
      headers: req.headers.append('Auth', 'Bearer ' + token), url: req.url});
      // headers: req.headers.append('Auth', 'Bearer ' + token), url: 'http://localhost:3000' + req.url});
    // const copiedReq = req.clone({ headers: req.headers.append('Access-Control-Allow-Origin', '*')});
    // const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});
    return next.handle(copiedReq);
    // return null;
  }
}
