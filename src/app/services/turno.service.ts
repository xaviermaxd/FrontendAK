import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../interfaces/turno.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  //private apiUrl = 'http://localhost:3000/api/turnos';
  private apiUrl = `${environment.apiUrl}/turnos`;

  constructor(private http: HttpClient) {}

  getTurnos(): Observable<Turno[]> {
    const headers = this.getHeaders();
    return this.http.get<Turno[]>(this.apiUrl, { headers });
  }

  getTurno(id: number): Observable<Turno> {
    const headers = this.getHeaders();
    return this.http.get<Turno>(`${this.apiUrl}/${id}`, { headers });
  }

  createTurno(turno: Turno): Observable<Turno> {
    const headers = this.getHeaders();
    return this.http.post<Turno>(this.apiUrl, turno, { headers });
  }

  updateTurno(id: number, turno: Turno): Observable<Turno> {
    const headers = this.getHeaders();
    return this.http.put<Turno>(`${this.apiUrl}/${id}`, turno, { headers });
  }

  deleteTurno(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }
}
