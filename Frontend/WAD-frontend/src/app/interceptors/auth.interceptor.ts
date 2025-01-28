import {HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {inject} from '@angular/core';

export const AuthInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  if (!req.url.includes('/api/tasks')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            const newAuthReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newToken.access}`),
            });
            return next(newAuthReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
