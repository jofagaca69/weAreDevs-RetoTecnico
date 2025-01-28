import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map, take} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    take(1),
    map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
        const returnUrl = state.url;
        return router.createUrlTree(['/login']);
      }
    )
  );
};
