import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sistemas } from '../models/sistemas.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SistemasService {
  //private apiUrl = 'http://localhost:3000/api/sistemas';
  private apiUrl = `${environment.apiUrl}/sistemas`;

  constructor(private http: HttpClient) {}

  getAllSistemas(): Observable<Sistemas[]> {
    return this.http.get<Sistemas[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
  
  getSistemasById(id: number): Observable<Sistemas> {
    return this.http.get<Sistemas>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
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
