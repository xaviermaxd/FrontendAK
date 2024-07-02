import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Veterinario } from '../models/veterinario.model';  
import { VeterinarioResponse } from '../interfaces/veterinarioResponse';  // Asegúrate de que esta interfaz está correctamente definida
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  //private apiUrl = 'http://localhost:3000/api/veterinarios';
  private apiUrl = `${environment.apiUrl}/veterinarios`;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentVeterinario = new BehaviorSubject<Veterinario | null>(null);

  constructor(private http: HttpClient,  private router: Router) {
    this.checkSession();
  }

  private checkSession(): void {
    const token = localStorage.getItem('token');
    const vetData = localStorage.getItem('veterinario');
  
    if (token) {
      this.isAuthenticated.next(true);
      if (vetData) {
        try {
          const vet = JSON.parse(vetData);
          this.currentVeterinario.next(vet);
        } catch (error) {
          console.error('Error parsing veterinarian data:', error);
        }
      }
    }
  }

  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { Usuario: usuario, Contrasena: contrasena }, { withCredentials: true })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('veterinario', JSON.stringify(response.veterinario));
            this.isAuthenticated.next(true);
            console.log('Setting current veterinarian:', response.veterinario);
            this.currentVeterinario.next(response.veterinario); // Suponiendo que la API devuelve un objeto 'veterinario'
            return response;
          }
          throw new Error('Authentication response is missing token or user data');
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  getVeterinario(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }


  getAllVeterinarios(page: number, pageSize: number, nombre: string = '', apellidoPaterno: string = '', apellidoMaterno: string = '', especialidad: string = ''): Observable<VeterinarioResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('nombre', nombre)
      .set('apellidoPaterno', apellidoPaterno)
      .set('apellidoMaterno', apellidoMaterno)
      .set('especialidad', especialidad); 
  
    return this.http.get<VeterinarioResponse>(`${this.apiUrl}`, { headers: this.getHeaders(), params });
  }
  

  getCurrentVeterinario(): Observable<Veterinario | null> {
    return this.currentVeterinario.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('veterinario');
    this.isAuthenticated.next(false);
    this.currentVeterinario.next(null);
    this.router.navigate(['/login']);
  }

  updatePassword(veterinarioId: number, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${veterinarioId}/updatepassword`, {
      currentPassword,
      newPassword
    }, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating password:', error);
        return throwError(() => new Error('Error updating password'));
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Some error occurred'));
  }

  // private getHeaders(): HttpHeaders {
  //   let headers = new HttpHeaders();
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     headers = headers.append('Authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // }

  private getHeaders(includeContentType: boolean = true): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    if (!includeContentType) {
      headers = headers.delete('Content-Type');
    }
    return headers;
  }


  public isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Simplemente verifica si el token existe
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }


  updateVeterinario(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders(false) })
      .pipe(
        catchError(error => {
          console.error('Error updating veterinarian:', error);
          return throwError(() => new Error('Error updating veterinarian'));
        })
      );
  }
  

  createVeterinario(veterinarioData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, veterinarioData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error creating veterinarian:', error);
          return throwError(() => new Error('Error creating veterinarian'));
        })
      );
  }


  public getUsuarioRol(): number {
    const vetData = localStorage.getItem('veterinario');
    if (vetData) {
        const vet = JSON.parse(vetData);
        return vet.Rol;  // Asegúrate de que el objeto 'veterinario' tiene un campo 'Rol'
    }
    return 0;  // Retorna 0 o cualquier otro valor por defecto que indique "sin rol"
  }

  public getUsuarioId(): number {
    const vetData = localStorage.getItem('veterinario');
    if (vetData) {
        const vet = JSON.parse(vetData);
        return vet.VeterinarioID;  // Asegúrate de que el objeto 'veterinario' tiene un campo 'Rol'
    }
    return 0;  // Retorna 0 o cualquier otro valor por defecto que indique "sin rol"
  }

  deleteVeterinario(veterinarioId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${veterinarioId}`, { headers: this.getHeaders() })
        .pipe(catchError(this.handleError));
  }
  

}
