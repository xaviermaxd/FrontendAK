// propietario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propietario } from '../models/propietario.model';
import { PropietarioResponse } from '../interfaces/propietarioResponse';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  //private apiUrl = 'http://localhost:3000/api/propietarios';
  private apiUrl = `${environment.apiUrl}/propietarios`;

  constructor(private http: HttpClient) { }

  getPropietarios(page: number, pageSize: number, nombre: string = '', segundoNombre: string = '', apellidoPaterno: string = '', apellidoMaterno: string = ''): Observable<PropietarioResponse> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('nombre', nombre)
      .set('segundoNombre', segundoNombre)
      .set('apellidoPaterno', apellidoPaterno)
      .set('apellidoMaterno', apellidoMaterno);
  
    return this.http.get<PropietarioResponse>(`${this.apiUrl}`, { headers: headers, params });
  }


  addPropietario(propietario: FormData): Observable<Propietario> {
    return this.http.post<Propietario>(this.apiUrl, propietario, { headers: this.getHeaders(false) });
  }

  updatePropietario(id: number, propietario: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, propietario, { headers: this.getHeaders(false) });
  }

  deletePropietario(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/disable`, {}, { headers: this.getHeaders() });
  }

  buscarPropietarios(nombre: string): Observable<PropietarioResponse> {
    const headers = this.getHeaders();
    return this.http.get<PropietarioResponse>(`${this.apiUrl}?nombre=${nombre}`, { headers: headers });
  }

  getPropietario(id: number): Observable<Propietario> {
    const headers = this.getHeaders();
    return this.http.get<Propietario>(`${this.apiUrl}/${id}`, { headers: headers });
  }

  // Método para obtener el conteo de propietarios
  contarPropietarios(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/contar`, { headers: headers });
  }

  private getHeaders(includeContentType: boolean = true): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    if (!includeContentType) {
      headers = headers.delete('Content-Type');
    }
    return headers;
  }


}
