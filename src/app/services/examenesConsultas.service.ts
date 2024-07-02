import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExamenesConsultas } from '../models/examenesConsultas.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenesConsultasService {
  //private apiUrl = 'http://localhost:3000/api/examenesConsultas';
  private apiUrl = `${environment.apiUrl}/examenesConsultas`;

  constructor(private http: HttpClient) {}

  getAllExamenesConsultas(): Observable<ExamenesConsultas[]> {
    return this.http.get<ExamenesConsultas[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getExamenesConsultasByConsultaMedicaId(consultaMedicaId: number): Observable<ExamenesConsultas[]> {
    return this.http.get<ExamenesConsultas[]>(`${this.apiUrl}/consultaMedica/${consultaMedicaId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  createExamenesConsultas(examenesConsultas: ExamenesConsultas): Observable<ExamenesConsultas> {
    return this.http.post<ExamenesConsultas>(this.apiUrl, examenesConsultas, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateExamenesConsultas(id: number, examenesConsultas: ExamenesConsultas): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, examenesConsultas, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteExamenesConsultas(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/disable`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getExamenesConsultasByFecha(fechaInicio: string, fechaFin: string): Observable<any[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<any[]>(`${this.apiUrl}/fecha`, { params, headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  uploadInforme(id: number, informe: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('informe', informe);

    return this.http.put<void>(`${this.apiUrl}/${id}/upload`, formData, { headers: this.getHeaders(false) })
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
