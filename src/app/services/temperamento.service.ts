import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Temperamento } from '../models/temperamento.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TemperamentoService {
  //private apiUrl = 'http://localhost:3000/api/temperamento';
  private apiUrl = `${environment.apiUrl}/temperamento`;

  constructor(private http: HttpClient) {}

  getAllTemperamento(): Observable<Temperamento[]> {
    return this.http.get<Temperamento[]>(this.apiUrl, { headers: this.getHeaders() })
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
