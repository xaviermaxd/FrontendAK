// src/app/services/historial-clinico.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; // Asegúrate de incluir HttpParams aquí
import { Observable } from 'rxjs';
import { HistorialClinico } from '../models/historialClinico.model';
import { HistorialClinicoResponse } from '../interfaces/historialClinicoResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {
  //private apiUrl = 'http://localhost:3000/api/historialesClinicos';
  private apiUrl = `${environment.apiUrl}/historialesClinicos`;

  constructor(private http: HttpClient) { }

  // En historial-clinico.service.ts
  getHistorialesPorMascota(mascotaId: number, fechaDesde?: string, fechaHasta?: string, page: number = 1, pageSize: number = 5): Observable<HistorialClinicoResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (fechaDesde) {
      params = params.set('fechaDesde', fechaDesde);
    }
    if (fechaHasta) {
      params = params.set('fechaHasta', fechaHasta);
    }

    return this.http.get<HistorialClinicoResponse>(`${this.apiUrl}/mascota/${mascotaId}`, { headers: this.getHeaders(), params });
  }

  getHistorialClinicoPorId(id: number): Observable<HistorialClinico> {
    return this.http.get<HistorialClinico>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }
  

  
}
