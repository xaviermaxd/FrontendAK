// eventos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventosService {
  //private apiUrl = 'http://localhost:3000/api';
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getEventosByMascotaId(mascotaId: number): Observable<any[]> {
    const vacunaciones$ = this.http.get<any[]>(`${this.apiUrl}/vacunaciones/mascota/${mascotaId}`, { headers: this.getHeaders() });
    const desparasitaciones$ = this.http.get<any[]>(`${this.apiUrl}/desparasitaciones/mascota/${mascotaId}`, { headers: this.getHeaders() });
    const consultasMedicas$ = this.http.get<any[]>(`${this.apiUrl}/consultaMedica/mascota/${mascotaId}`, { headers: this.getHeaders() });

    return forkJoin([vacunaciones$, desparasitaciones$, consultasMedicas$]).pipe(
      map(([vacunaciones, desparasitaciones, consultasMedicas]) => {
        const eventos = [
          ...vacunaciones.map(v => ({ ...v, tipo: 'Vacunación', fecha: v.fecha_aplicacion, veterinario: `${v.Veterinario.Nombre} ${v.Veterinario.ApellidoPaterno} ${v.Veterinario.ApellidoMaterno}` })),
          ...desparasitaciones.map(d => ({ ...d, tipo: 'Desparasitación', fecha: d.fecha_aplicacion, veterinario: `${d.Veterinario.Nombre} ${d.Veterinario.ApellidoPaterno} ${d.Veterinario.ApellidoMaterno}` })),
          ...consultasMedicas.map(c => ({ ...c, tipo: 'Consulta Médica', fecha: c.fecha_consulta, veterinario: `${c.Veterinario.Nombre} ${c.Veterinario.ApellidoPaterno} ${c.Veterinario.ApellidoMaterno}` }))
        ];

        return eventos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      })
    );
  }

  private getHeaders(includeContentType: boolean = true): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    if (!includeContentType) {
      headers = headers.delete('Content-Type');
    }
    return headers;
  }
}
