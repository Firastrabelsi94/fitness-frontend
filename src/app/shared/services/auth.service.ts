import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface AuthResult { accessToken: string; refreshToken: string }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly ACCESS_KEY = 'access_token';
  private readonly REFRESH_KEY = 'refresh_token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<void> {
    return this.http.post<AuthResult>('/api/auth/login', { username, password }).pipe(
      map(res => {
        this.setAccessToken(res.accessToken);
        this.setRefreshToken(res.refreshToken);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<void> {
    return this.http.post<AuthResult>('/api/auth/register', { username, email, password }).pipe(
      map(res => {
        this.setAccessToken(res.accessToken);
        this.setRefreshToken(res.refreshToken);
      })
    );
  }

  setAccessToken(token: string) { localStorage.setItem(this.ACCESS_KEY, token); }
  setRefreshToken(token: string) { localStorage.setItem(this.REFRESH_KEY, token); }
  getAccessToken(): string | null { return localStorage.getItem(this.ACCESS_KEY); }
  getRefreshToken(): string | null { return localStorage.getItem(this.REFRESH_KEY); }
  clear() { localStorage.removeItem(this.ACCESS_KEY); localStorage.removeItem(this.REFRESH_KEY); }

  isLoggedIn(): boolean {
    const t = this.getAccessToken();
    if (!t) return false;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      const exp = payload.exp;
      if (!exp) return true; // no exp claim
      return Date.now() < exp * 1000;
    } catch (e) {
      return false;
    }
  }
}
