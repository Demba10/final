import { Injectable } from '@angular/core';
import { UsersComponent } from '../admin/users/users.component';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private user: UsersService,
    private route: Router
  ) { }

  connexion(email: string, password: string) {
    const auth = { email: email, password: password };
    this.user.post('login', auth).subscribe(
      response => {
        if (response.authorization) {
          Swal.fire({
            title: 'Connexion réussie',
            text: '',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.route.navigate(['/accueil']);
        } else {
          Swal.fire({
            title: 'Echec de la connexion',
            text: '',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    )
  }
}
