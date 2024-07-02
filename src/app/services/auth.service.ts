import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000/api/veterinarios';
  private apiUrl = `${environment.apiUrl}/veterinarios`;
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, contrasena: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/login`, { usuario, contrasena }, { headers: headers, withCredentials: true })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.isAuthenticated.next(true);
            this.router.navigateByUrl('/inicio');
            return response;
          }
          throw new Error('Authentication response is missing token');
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
