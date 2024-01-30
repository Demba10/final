import { Injectable } from '@angular/core';
import { UsersComponent } from '../admin/users/users.component';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private user: UsersService,
    private route: Router,
    private tokenService: TokenService
  ) { }

  connexion(email: string, password: string) {
    const auth = { email: email, password: password };
    this.user.post('login', auth).subscribe(
      response => {
        this.tokenService.saveToken(response.authorization.token);
        console.log(response.user.role);
        Swal.fire({
          title: 'Connexion réussie',
          text: '',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        if (response.user.role == 'admin') {
          this.route.navigate(['/administrateur'])
        }  
        if (response.user.role == 'clients') {
          this.route.navigate(['/']);
        }
        if (response.user.role == 'jardinier') {
          this.route.navigate(['/']);
        }
      }, 
      // error => {
      //   Swal.fire({
      //     title: 'Echec de la connexion',
      //     text: '',
      //     icon: 'error',
      //     confirmButtonText: 'OK'
      //   });
      // }
    )
  }
}