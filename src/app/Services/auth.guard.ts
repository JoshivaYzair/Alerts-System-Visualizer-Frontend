import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginEventService } from './LoginEventService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private _loginEventService: LoginEventService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.authService.logout();
      this._loginEventService.emitLoginSuccessEvent();
      return false;
    }
  }
}
