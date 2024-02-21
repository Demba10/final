import { CanActivateFn, Router } from '@angular/router';

export const allGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('userOnline') || '[]');
  const router = new Router();
  if (user.role_id == 1) {
    router.navigate(['/administrateur']);
    return false
  }
  return true;
};