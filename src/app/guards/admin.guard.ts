import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('userOnline') || '[]');
  const router = new Router();
  if (user.role_id == 1) {
    return true;
  } else {
    router.navigate(['/auth']);
    localStorage.removeItem('userOnline');
    localStorage.removeItem('token');
  }
  return false;
};