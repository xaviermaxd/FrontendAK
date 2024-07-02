import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExamenesMedicos } from '../models/examenesMedicos.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenesMedicosService {
  //private apiUrl = 'http://localhost:3000/api/examenesMedicos';
  private apiUrl = `${environment.apiUrl}/examenesMedicos`;

  constructor(private http: HttpClient) {}

  getAllExamenesMedicos(): Observable<ExamenesMedicos[]> {
    return this.http.get<ExamenesMedicos[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getExamenMedicoById(id: number): Observable<ExamenesMedicos> {
    return this.http.get<ExamenesMedicos>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return headers;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Some error occurred'));
  }
}
