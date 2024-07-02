import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vacunacion } from '../models/vacunacion.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VacunacionService {
  //private apiUrl = 'http://localhost:3000/api/vacunaciones';
  private apiUrl = `${environment.apiUrl}/vacunaciones`;

  constructor(private http: HttpClient) {}

  createVacunacion(vacunacion: Vacunacion): Observable<Vacunacion> {
    const headers = this.getHeaders();
    return this.http.post<Vacunacion>(this.apiUrl, vacunacion, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllVacunaciones(): Observable<Vacunacion[]> {
    const headers = this.getHeaders();
    return this.http.get<Vacunacion[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  getVacunacion(id: number): Observable<Vacunacion> {
    const headers = this.getHeaders();
    return this.http.get<Vacunacion>(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  updateVacunacion(id: number, vacunacion: Vacunacion): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/${id}`, vacunacion, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteVacunacion(id: number): Observable<void> {
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
