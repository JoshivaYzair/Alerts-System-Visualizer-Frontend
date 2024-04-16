import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserLogin } from '../interfaces/userLogin';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private myAppUrl: string = 'https://localhost:7276/'; 
  private myApiUrl: string = 'app/Login/';

  constructor(private http: HttpClient,private router: Router,) { }

  public login(credentials: UserLogin): Observable<UserLogin> {
    return this.http.post(this.myAppUrl+this.myApiUrl, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  getRole():string | null{
    const token = this.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      for (const claim in tokenPayload) {
        if (claim.endsWith('/role')) {
          return tokenPayload[claim]; 
        }
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }
    const tokenPayload = this.parseJwt(token);
    const expirationDate = new Date(tokenPayload.exp * 1000);
    const currentDate = new Date();
    return expirationDate <= currentDate;
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
