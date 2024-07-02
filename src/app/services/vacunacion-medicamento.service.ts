import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VacunacionMedicamento } from '../models/vacunacion-medicamento.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VacunacionMedicamentoService {
  //private apiUrl = 'http://localhost:3000/api/vacunacionMedicamento';
  private apiUrl = `${environment.apiUrl}/vacunacionMedicamento`;

  constructor(private http: HttpClient) {}

  createVacunacionMedicamento(vacunacionMedicamento: VacunacionMedicamento): Observable<VacunacionMedicamento> {
    const headers = this.getHeaders();
    return this.http.post<VacunacionMedicamento>(this.apiUrl, vacunacionMedicamento, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllVacunacionMedicamentos(): Observable<VacunacionMedicamento[]> {
    const headers = this.getHeaders();
    return this.http.get<VacunacionMedicamento[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  getVacunacionMedicamento(id: number): Observable<VacunacionMedicamento> {
    const headers = this.getHeaders();
    return this.http.get<VacunacionMedicamento>(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  getMedicamentosPorVacunacionId(id: number): Observable<VacunacionMedicamento[]> {
    const headers = this.getHeaders();
    return this.http.get<VacunacionMedicamento[]>(`${this.apiUrl}/${id}/medicamentos`, { headers })
      .pipe(catchError(this.handleError));
  }
  

  updateVacunacionMedicamento(id: number, vacunacionMedicamento: VacunacionMedicamento): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/${id}`, vacunacionMedicamento, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteVacunacionMedicamento(id: number): Observable<void> {
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
