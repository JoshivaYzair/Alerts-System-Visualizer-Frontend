import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../interfaces/Alert';
import { itemsResponse } from '../interfaces/itemsResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private myAppUrl: string = 'https://localhost:7276/';
  private myApiUrl: string = 'api/Alert/';

  constructor(private http: HttpClient, private _authService : AuthService) { }

  public getAllAlert(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public getAllAlertPaginatorWithFilter(page: number, pageSize: number, filter:string, startDate: string | null, endDate:string | null): Observable<itemsResponse> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}paginator/filter?page=${page}&pageSize=${pageSize}&filter=${filter}&startDate=${startDate}&endDate=${endDate}`).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public getAlertById(id: number): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + id).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public deleteAlert(id: number) {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public updateUser(id: number, alert: Alert): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, alert).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
