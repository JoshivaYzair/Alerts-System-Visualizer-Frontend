import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarComponent } from '../utilities/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthorized = this._authService.getRole() === route.data['role'] ? true : false;
      if(!isAuthorized){
        this._snackBar.openFromComponent(SnackbarComponent,{
          duration: 5000,
          data: { type: 'Error', message: 'You do not possess the required permissions.', icon: 'close' },
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/alert']);
      }
    return isAuthorized;
  }
  
}
