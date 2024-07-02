import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PosologiaPorEspecie } from '../models/posologia-por-especie.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PosologiaPorEspecieService {
  //private apiUrl = 'http://localhost:3000/api/posologiaPorEspecie';
  private apiUrl = `${environment.apiUrl}/posologiaPorEspecie`;

  constructor(private http: HttpClient) {}

  createPosologia(posologia: PosologiaPorEspecie): Observable<PosologiaPorEspecie> {
    const headers = this.getHeaders();
    return this.http.post<PosologiaPorEspecie>(this.apiUrl, posologia, { headers })
      .pipe(catchError(this.handleError));
  }

  getPosologiasPorMedicamento(medicamento_id: number): Observable<PosologiaPorEspecie[]> {
    const headers = this.getHeaders();
    return this.http.get<PosologiaPorEspecie[]>(`${this.apiUrl}/medicamento/${medicamento_id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // updatePosologia(medicamentoId: number, posologia: PosologiaPorEspecie): Observable<PosologiaPorEspecie> {
  //   const headers = this.getHeaders();
  //   return this.http.put<PosologiaPorEspecie>(`${this.apiUrl}/medicamento/${medicamentoId}`, posologia, { headers })
  //     .pipe(catchError(this.handleError));
  // }

  updatePosologia(posologiaId: number, posologia: PosologiaPorEspecie): Observable<PosologiaPorEspecie> {
    const headers = this.getHeaders();
    return this.http.put<PosologiaPorEspecie>(`${this.apiUrl}/${posologiaId}`, posologia, { headers })
      .pipe(catchError(this.handleError));
  }

  eliminarPosologia(id: number): Observable<any> {
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
