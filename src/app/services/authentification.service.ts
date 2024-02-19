import { Injectable, OnInit } from '@angular/core';
import { UsersComponent } from '../admin/users/users.component';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService implements OnInit {
  userOnLine: any;

  constructor(
    private user: UsersService,
    private route: Router,
    private tokenService: TokenService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '');
  }

  connexion(email: string, password: string) {
    const auth = { email: email, password: password };
    this.user.post('login', auth).subscribe(
      response => {
        this.tokenService.saveToken(response.authorization.token);
        console.log(response);
        if (response) {
          localStorage.setItem('userOnline', JSON.stringify(response.user));
          localStorage.setItem('time', '90');
          console.log(response);
          if (response.user.role_id == 1) {
            this.route.navigate(['/administrateur']);
          }
          if (response.user.role_id == 3) {
            this.route.navigate(['/']);
          }
          if (response.user.role_id == 2) {
            this.route.navigate(['user/espace-creatif']);
          }
        }
      },
      error => {
        console.log('erreur ', error);
        Swal.fire({
          title: 'Echec',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
    )
  }
  lister() {
  }
}