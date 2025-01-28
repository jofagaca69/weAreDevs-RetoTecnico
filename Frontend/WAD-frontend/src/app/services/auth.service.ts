import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';

interface AuthTokens {
  access: string;
  refresh: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8000/api';
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginCredentials): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.API_URL}/token/`, credentials)
      .pipe(
        tap(tokens => this.storeTokens(tokens)),
        catchError(error => {
          console.error('Error durante el login:', error);
          return throwError(() => error);
        })
      );
  }

  refreshToken(): Observable<{ access: string }> {
    const refresh = this.getRefreshToken();

    if (!refresh) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<{ access: string }>(`${this.API_URL}/token/refresh/`, { refresh })
      .pipe(
        tap(response => {
          this.storeAccessToken(response.access);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(error => {
          console.error('Error refreshing token:', error);
          this.logout();
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isAuthenticatedSync(): boolean {
    return this.hasValidToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private storeTokens(tokens: AuthTokens): void {
    this.storeAccessToken(tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh);
    this.isAuthenticatedSubject.next(true);
  }

  private storeAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  private hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      return expirationDate > new Date();
    } catch {
      return false;
    }
  }
}

