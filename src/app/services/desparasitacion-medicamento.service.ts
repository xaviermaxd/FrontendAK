import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DesparasitacionMedicamento } from '../models/desparasitacion-medicamento.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesparasitacionMedicamentoService {
  //private apiUrl = 'http://localhost:3000/api/desparasitacionMedicamento';
  private apiUrl = `${environment.apiUrl}/desparasitacionMedicamento`;

  constructor(private http: HttpClient) {}

  createDesparasitacionMedicamento(desparasitacionMedicamento: DesparasitacionMedicamento): Observable<DesparasitacionMedicamento> {
    const headers = this.getHeaders();
    return this.http.post<DesparasitacionMedicamento>(this.apiUrl, desparasitacionMedicamento, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllDesparasitacionMedicamentos(): Observable<DesparasitacionMedicamento[]> {
    const headers = this.getHeaders();
    return this.http.get<DesparasitacionMedicamento[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  getDesparasitacionMedicamento(id: number): Observable<DesparasitacionMedicamento> {
    const headers = this.getHeaders();
    return this.http.get<DesparasitacionMedicamento>(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  updateDesparasitacionMedicamento(id: number, desparasitacionMedicamento: DesparasitacionMedicamento): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/${id}`, desparasitacionMedicamento, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteDesparasitacionMedicamento(id: number): Observable<void> {
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
