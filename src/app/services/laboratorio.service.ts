import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Laboratorio } from '../models/laboratorio.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  //private apiUrl = 'http://localhost:3000/api/laboratorios';
  private apiUrl = `${environment.apiUrl}/laboratorios`;

  constructor(private http: HttpClient) {}

  getAllLaboratorios(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(`${this.apiUrl}`, { headers: this.getHeaders() })
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
