// services/eventos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  //private apiUrl = 'http://localhost:3000/api/eventos';
  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  getEventosAgrupadosPorDia(fechaInicio: string, fechaFin: string, tipoEvento: string): Observable<any[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin)
      .set('tipoEvento', tipoEvento);

    return this.http.get<any[]>(`${this.apiUrl}/eventosAgrupadosPorDia`, { params, headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return headers;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Some error occurred'));
  }
}
