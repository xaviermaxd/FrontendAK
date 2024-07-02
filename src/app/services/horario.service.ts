import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../interfaces/horario.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  //private apiUrl = 'http://localhost:3000/api/horarios';
  private apiUrl = `${environment.apiUrl}/horarios`;

  constructor(private http: HttpClient) {}

  getHorarios(): Observable<Horario[]> {
    const headers = this.getHeaders();
    return this.http.get<Horario[]>(this.apiUrl, { headers });
  }

  getHorario(id: number): Observable<Horario> {
    const headers = this.getHeaders();
    return this.http.get<Horario>(`${this.apiUrl}/${id}`, { headers });
  }

  createHorario(horario: Horario): Observable<Horario> {
    const headers = this.getHeaders();
    return this.http.post<Horario>(this.apiUrl, horario, { headers });
  }

  updateHorario(id: number, horario: Horario): Observable<Horario> {
    const headers = this.getHeaders();
    return this.http.put<Horario>(`${this.apiUrl}/${id}`, horario, { headers });
  }

  deleteHorario(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }
}
