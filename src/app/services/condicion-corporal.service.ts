import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CondicionCorporal } from '../models/condicion-corporal.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondicionCorporalService {
  //private apiUrl = 'http://localhost:3000/api/condicionCorporal';
  private apiUrl = `${environment.apiUrl}/condicionCorporal`;

  constructor(private http: HttpClient) {}

  getAllCondicionCorporal(): Observable<CondicionCorporal[]> {
    return this.http.get<CondicionCorporal[]>(this.apiUrl, { headers: this.getHeaders() })
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
