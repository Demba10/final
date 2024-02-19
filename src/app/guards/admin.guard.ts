import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../services/shared.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('userOnline') || '');
  const router = new Router();
  if (user.role_id == 1) {
    return true;
  } else {
    router.navigate(['/auth']);
    localStorage.removeItem('userOnline');
    localStorage.removeItem('token');
    // Swal.fire({
    //   title: 'Acces interdit',
    //   text: '',
    //   icon: 'error',
    // });
  }
  return false;
};