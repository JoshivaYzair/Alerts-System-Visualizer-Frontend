import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Alert } from '../interfaces/Alert';
import { itemsResponse } from '../interfaces/itemsResponse';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private myAppUrl: string = 'https://localhost:7276/';
  private myApiUrl: string = 'api/Alert/';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  public getAllAlert(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl,{ headers: this.getHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public getAllAlertPaginator(page: number, pageSize: number): Observable<itemsResponse> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl +page + "," +pageSize ,{ headers: this.getHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public getAllAlertPaginatorWithFilter(page: number, pageSize: number, filter:string): Observable<itemsResponse> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl +page + "/" +pageSize +"/" +filter,{ headers: this.getHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public getAlertById(id: number): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + id,{ headers: this.getHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public deleteAlert(id: number) {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id,{ headers: this.getHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public updateUser(id: number, alert: Alert): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, alert,{ headers: this.getHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

}
