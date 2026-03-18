import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/auth';

  constructor(private http: HttpClient) {}

  // ✅ LOGIN (FIXED: username instead of email)
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, {
      username: username,
      password: password
    }).pipe(
      tap((res) => {
        if (res?.access_token) {
          this.saveToken(res.access_token);
        }
      }),
      catchError(this.handleError)
    );
  }

  // ✅ SIGNUP
  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data)
      .pipe(catchError(this.handleError));
  }

  // ✅ TOKEN METHODS
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ ERROR HANDLER
  private handleError(error: HttpErrorResponse) {
    let message = 'Something went wrong';

    if (error.error?.detail) {
      message = error.error.detail;
    }

    return throwError(() => message);
  }
}