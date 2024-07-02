import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PresentacionesMedicamento } from '../models/presentaciones-medicamento.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PresentacionesMedicamentoService {
  //private apiUrl = 'http://localhost:3000/api/presentacionesMedicamento';
  private apiUrl = `${environment.apiUrl}/presentacionesMedicamento`;

  constructor(private http: HttpClient) {}

  createPresentacion(presentacion: PresentacionesMedicamento): Observable<PresentacionesMedicamento> {
    const headers = this.getHeaders();
    return this.http.post<PresentacionesMedicamento>(this.apiUrl, presentacion, { headers })
      .pipe(catchError(this.handleError));
  }

  getPresentacionesPorMedicamento(medicamento_id: number): Observable<PresentacionesMedicamento[]> {
    const headers = this.getHeaders();
    return this.http.get<PresentacionesMedicamento[]>(`${this.apiUrl}/medicamento/${medicamento_id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // updatePresentacion(medicamentoId: number, presentacion: PresentacionesMedicamento): Observable<PresentacionesMedicamento> {
  //   const headers = this.getHeaders();
  //   return this.http.put<PresentacionesMedicamento>(`${this.apiUrl}/medicamento/${medicamentoId}`, presentacion, { headers })
  //     .pipe(catchError(this.handleError));
  // }

  updatePresentacion(presentacionId: number, presentacion: PresentacionesMedicamento): Observable<PresentacionesMedicamento> {
    const headers = this.getHeaders();
    return this.http.put<PresentacionesMedicamento>(`${this.apiUrl}/${presentacionId}`, presentacion, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllPresentaciones(): Observable<PresentacionesMedicamento[]> {
    const headers = this.getHeaders();
    return this.http.get<PresentacionesMedicamento[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  eliminarPresentacion(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${id}/disable`, {}, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Some error occurred'));
  }

  private getHeaders(includeContentType: boolean = true): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    if (!includeContentType) {
      headers = headers.delete('Content-Type');
    }
    return headers;
  }
}
