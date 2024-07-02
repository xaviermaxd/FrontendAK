// mascota.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota.model';
import { MascotaResponse } from '../interfaces/mascotaResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  //private apiUrl = 'http://localhost:3000/api/mascotas';
  private apiUrl = `${environment.apiUrl}/mascotas`;

  constructor(private http: HttpClient) { }

  // mascota.service.ts
  getMascota(id: number): Observable<Mascota> {
    const headers = this.getHeaders();
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`, { headers: headers });
  }

  getMascotas(page: number, pageSize: number, nombre: string = '', propietario: string = '', especie: string = 'todos'): Observable<MascotaResponse> {
    const headers = this.getHeaders();
    return this.http.get<MascotaResponse>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}&nombre=${nombre}&propietario=${propietario}&especie=${especie}`, { headers: headers });
  }

  getMascotasPorPropietario(id: number, page: number, pageSize: number): Observable<MascotaResponse> {
    const headers = this.getHeaders();
    return this.http.get<MascotaResponse>(`${this.apiUrl}/propietario/${id}?page=${page}&pageSize=${pageSize}`, { headers: headers });
  }

  addMascota(mascota: FormData): Observable<Mascota> {
    return this.http.post<Mascota>(this.apiUrl, mascota, { headers: this.getHeaders(false) });
  }

  updateMascota(id: number, mascota: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mascota, { headers: this.getHeaders(false) });
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/disable`, {}, { headers: this.getHeaders() });
  }


  private getHeaders(includeContentType: boolean = true): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    if (!includeContentType) {
      headers = headers.delete('Content-Type');
    }
    return headers;
  }
}
