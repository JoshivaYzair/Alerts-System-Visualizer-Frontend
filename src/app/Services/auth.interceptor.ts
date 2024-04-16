import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginEventService } from './LoginEventService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private _loginEventService: LoginEventService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.authService.getToken(); 
    
    if (token) {
        if (!this.authService.isAuthenticated()){
          this.authService.logout()
          this._loginEventService.emitLoginSuccessEvent();
        }else{
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
    } 
    return next.handle(req)
  }
}
