import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // 🔹 Fake backend login API
  login(email: string, password: string): Observable<any> {
    if (email === 'admin@test.com' && password === '1234') {
      return of({
        token: 'FAKE_JWT_TOKEN_123456',
        role: 'ADMIN',
        user: 'Admin'
      }).pipe(delay(800));
    }

    return of(null).pipe(delay(800));
  }

  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}