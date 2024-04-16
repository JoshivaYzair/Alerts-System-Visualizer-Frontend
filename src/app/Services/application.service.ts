import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { itemsResponse } from '../interfaces/itemsResponse';
import { AuthService } from './auth.service';
import { Application } from '../interfaces/Application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private myAppUrl: string = 'https://localhost:7276/';
  private myApiUrl: string = 'api/Application/';

  constructor(private http: HttpClient, private _authService : AuthService) { }

  public getAllApp(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public getAllAppPaginatorWithFilter(page: number, pageSize: number, filter:string): Observable<itemsResponse> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}paginator/filter?page=${page}&pageSize=${pageSize}&filter=${filter}`).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public getAppById(id: number): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + id).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public deleteApp(id: number) {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public updateApp(id: number, app: Application): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, app).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public postApp(app: Application): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, app).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
