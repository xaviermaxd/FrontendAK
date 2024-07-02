import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListaProblemas } from '../models/listaProblemas.model';
import { Problema } from '../models/problema.model'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaProblemasService {
  //private apiUrl = 'http://localhost:3000/api/listaProblemas';
  private apiUrl = `${environment.apiUrl}/listaProblemas`;

  constructor(private http: HttpClient) {}

  getAllListaProblemas(): Observable<ListaProblemas[]> {
    return this.http.get<ListaProblemas[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getListaProblemasByConsultaMedicaId(consultaMedicaId: number): Observable<ListaProblemas[]> {
    return this.http.get<ListaProblemas[]>(`${this.apiUrl}/consultaMedica/${consultaMedicaId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  createListaProblemas(listaProblemas: ListaProblemas): Observable<ListaProblemas> {
    return this.http.post<ListaProblemas>(this.apiUrl, listaProblemas, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  getListaProblemasByFecha(fechaInicio: string, fechaFin: string): Observable<Problema[]> { // Usa la interfaz Problema
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<Problema[]>(`${this.apiUrl}/fecha`, { params, headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
  
  

  updateListaProblemas(id: number, listaProblemas: ListaProblemas): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, listaProblemas, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteListaProblemas(id: number): Observable<void> {
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
