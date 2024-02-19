import { CanActivateFn, Router, RouterLink } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('userOnline') || '');
  const router = new Router();
  if (user.role_id == 1) {
    router.navigate(['/administrateur']);
    return false
  }
  return true;
};