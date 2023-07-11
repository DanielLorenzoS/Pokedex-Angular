import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginComponent)

  if (loginService.handleAuth()) {
    return true;
  } else {
    return router.parseUrl('/');
  }
};
