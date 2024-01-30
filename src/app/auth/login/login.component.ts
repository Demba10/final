import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // les propriétés pour la connexion
  email!: string;
  password!: string;

  constructor(
    private user: UsersService,
    private auth: AuthentificationService
  ) {}
  ngOnInit(): void {
    this.user.getClients().subscribe(
      response => console.log(response)
    )   
  }

  connexion() {
    this.auth.connexion(this.email, this.password);
  }
}