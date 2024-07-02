import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MotivoConsulta } from '../models/motivoConsulta.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotivoConsultaService {
  //private apiUrl = 'http://localhost:3000/api/motivoConsulta';
  private apiUrl = `${environment.apiUrl}/motivoConsulta`;

  constructor(private http: HttpClient) {}

  getAllMotivoConsulta(): Observable<MotivoConsulta[]> {
    return this.http.get<MotivoConsulta[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getMotivoConsultaByConsultaMedicaId(consultaMedicaId: number): Observable<MotivoConsulta[]> {
    return this.http.get<MotivoConsulta[]>(`${this.apiUrl}/consultaMedica/${consultaMedicaId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  createMotivoConsulta(motivoConsulta: MotivoConsulta): Observable<MotivoConsulta> {
    return this.http.post<MotivoConsulta>(this.apiUrl, motivoConsulta, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateMotivoConsulta(id: number, motivoConsulta: MotivoConsulta): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, motivoConsulta, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteMotivoConsulta(id: number): Observable<void> {
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
