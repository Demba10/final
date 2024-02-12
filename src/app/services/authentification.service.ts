import { Injectable } from '@angular/core';
import { UsersComponent } from '../admin/users/users.component';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private user: UsersService,
    private route: Router,
    private tokenService: TokenService,
    private sharedService: SharedService
  ) { }

  connexion(email: string, password: string) {
    const auth = { email: email, password: password };
    this.user.post('login', auth).subscribe(
      response => {
        this.tokenService.saveToken(response.authorization.token);
        console.log(response);
        if (response) {
          localStorage.setItem('userOnline', JSON.stringify(response.user));
          localStorage.setItem('time', '90');
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
            this.route.navigate(['user/espace-verte']);
          }
        } else {
          Swal.fire({
            title: 'Echec de la connexion',
            text: '',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error => {
        // this.sharedService.alert("error", error.error.message, "error")
        console.log('erreur ', error);
        alert('erreur');
      }
    )
  }
}