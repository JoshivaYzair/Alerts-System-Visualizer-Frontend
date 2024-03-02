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
  private myAppUrl: string = 'https://localhost:7276/'; // Endpoint de autenticación
  private myApiUrl: string = 'app/Login/';

  constructor(private http: HttpClient) { }

  public login(credentials: UserLogin): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // Almacena el token en el LocalStorage
        console.log(response.token);
        
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del LocalStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Obtiene el token del LocalStorage
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Verifica si el token existe y no está caducado
    return token !== null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    // Implementa la lógica para verificar si el token ha caducado
    // Retorna true si ha caducado, false en caso contrario
    return false;
  }
}
