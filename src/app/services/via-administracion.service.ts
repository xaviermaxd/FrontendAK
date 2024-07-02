import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ViaAdministracion } from '../models/via-administracion.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ViaAdministracionService {
  //private apiUrl = 'http://localhost:3000/api/viasAdministracion';
  private apiUrl = `${environment.apiUrl}/viasAdministracion`;

  constructor(private http: HttpClient) {}

  getAllViasAdministracion(): Observable<ViaAdministracion[]> {
    return this.http.get<ViaAdministracion[]>(`${this.apiUrl}`, { headers: this.getHeaders() })
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
