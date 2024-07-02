import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  //private apiUrl = 'http://localhost:3000/api/reservas';
  private apiUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {}

  getReservas(): Observable<Reserva[]> {
    const headers = this.getHeaders();
    return this.http.get<Reserva[]>(this.apiUrl, { headers });
  }

  getReserva(id: number): Observable<Reserva> {
    const headers = this.getHeaders();
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`, { headers });
  }

  createReserva(reserva: Reserva): Observable<Reserva> {
    const headers = this.getHeaders();
    return this.http.post<Reserva>(this.apiUrl, reserva, { headers });
  }

  updateReserva(id: number, reserva: Reserva): Observable<Reserva> {
    const headers = this.getHeaders();
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva, { headers });
  }

  deleteReserva(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getEstadisticasReservas(fechaInicio: string, fechaFin: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/estadisticas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, { headers });
  }
  
  

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }
}
