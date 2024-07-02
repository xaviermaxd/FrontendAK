import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mucosas } from '../models/mucosas.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MucosasService {
  //private apiUrl = 'http://localhost:3000/api/mucosas';
  private apiUrl = `${environment.apiUrl}/mucosas`;

  constructor(private http: HttpClient) {}

  getAllMucosas(): Observable<Mucosas[]> {
    return this.http.get<Mucosas[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private getHeaders(includeContentType: boolean = true): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    if (!includeContentType) {
      headers = headers.delete('Content-Type');
    }
    return headers;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Some error occurred'));
  }
}
