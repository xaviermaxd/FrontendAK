import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConsultaMedica } from '../models/consultaMedica.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaMedicaService {
  //private apiUrl = 'http://localhost:3000/api/consultaMedica';
  private apiUrl = `${environment.apiUrl}/consultaMedica`;

  constructor(private http: HttpClient) {}

  getAllConsultaMedica(): Observable<ConsultaMedica[]> {
    return this.http.get<ConsultaMedica[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getConsultaMedicaById(id: number): Observable<ConsultaMedica> {
    return this.http.get<ConsultaMedica>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getConsultaMedicaByMascotaId(mascotaId: number): Observable<ConsultaMedica[]> {
    return this.http.get<ConsultaMedica[]>(`${this.apiUrl}/mascota/${mascotaId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getConsultaMedicaByVeterinarioId(veterinarioId: number): Observable<ConsultaMedica[]> {
    return this.http.get<ConsultaMedica[]>(`${this.apiUrl}/veterinario/${veterinarioId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  createConsultaMedica(consultaMedica: ConsultaMedica): Observable<ConsultaMedica> {
    return this.http.post<ConsultaMedica>(this.apiUrl, consultaMedica, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateConsultaMedica(id: number, consultaMedica: ConsultaMedica): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, consultaMedica, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteConsultaMedica(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/disable`, { headers: this.getHeaders() })
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
