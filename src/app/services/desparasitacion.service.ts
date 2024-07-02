import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Desparasitacion } from '../models/desparasitacion.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesparasitacionService {
  //private apiUrl = 'http://localhost:3000/api/desparasitaciones';
  private apiUrl = `${environment.apiUrl}/desparasitaciones`;

  constructor(private http: HttpClient) {}

  createDesparasitacion(desparasitacion: Desparasitacion): Observable<Desparasitacion> {
    const headers = this.getHeaders();
    return this.http.post<Desparasitacion>(this.apiUrl, desparasitacion, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllDesparasitaciones(): Observable<Desparasitacion[]> {
    const headers = this.getHeaders();
    return this.http.get<Desparasitacion[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  getDesparasitacion(id: number): Observable<Desparasitacion> {
    const headers = this.getHeaders();
    return this.http.get<Desparasitacion>(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  updateDesparasitacion(id: number, desparasitacion: Desparasitacion): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/${id}`, desparasitacion, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteDesparasitacion(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/${id}/disable`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Some error occurred'));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }
}
