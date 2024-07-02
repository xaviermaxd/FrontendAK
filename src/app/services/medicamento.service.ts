import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Medicamento } from '../models/medicamento.model';
import { MedicamentoResponse } from '../interfaces/medicamentoResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  //private apiUrl = 'http://localhost:3000/api/medicamentos';
  private apiUrl = `${environment.apiUrl}/medicamentos`;

  constructor(private http: HttpClient) {}

  getAllMedicamentos(page: number, pageSize: number, nombre: string = '', laboratorio: string = '', usoTerapeutico: string = '', viaAdministracion: string = ''): Observable<MedicamentoResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('nombre', nombre)
      .set('laboratorio', laboratorio)
      .set('usoTerapeutico', usoTerapeutico)
      .set('viaAdministracion', viaAdministracion);

    return this.http.get<MedicamentoResponse>(`${this.apiUrl}`, { headers: this.getHeaders(), params });
  }

  getMedicamento(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  

  createMedicamento(medicamentoData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, medicamentoData, { headers: this.getHeaders(false) })
      .pipe(
        catchError(error => {
          console.error('Error creating medicamento:', error);
          return throwError(() => new Error('Error creating medicamento'));
        })
      );
  }

  updateMedicamento(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders(false) })
      .pipe(
        catchError(error => {
          console.error('Error updating medicamento:', error);
          return throwError(() => new Error('Error updating medicamento'));
        })
      );
  }

  deleteMedicamento(medicamentoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${medicamentoId}/disable`, {}, { headers: this.getHeaders() })
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
