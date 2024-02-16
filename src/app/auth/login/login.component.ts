import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { SharedService } from 'src/app/services/shared.service';
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
  reset: any = false;
  messagePassword: string = ''
  messageEmail: string = '';
  colorEmail = '#e7e7e7';
  colorPass = '#e7e7e7';
  type: string = "password";
  controle: boolean = true;

  constructor(
    private user: UsersService,
    private auth: AuthentificationService,
    private sharedService: SharedService
  ) { }
  ngOnInit(): void {
    // this.reset = localStorage.setItem('reset', this.reset);
    this.user.getClients().subscribe();
  }

  changeType() {
    this.controle = !this.controle;
    if (this.controle == true) {
      this.type = "passsword";
    } else {
      this.type = "text";
    }
  }
  emailValidatiion() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      this.messageEmail = "Format email invalide";
      this.colorEmail = "rgb(249, 67, 67)";
    } else {
      this.messageEmail = '';
      this.colorEmail = '#e7e7e7';
    }
    if (this.email === '') {
      this.messageEmail = "";
      this.colorEmail = '#e7e7e7';
    }
  }
  passwordValidatiion() {
    if (this.password.length < 8) {
      this.messagePassword = "le mot de passe doit etre superireur à 8 catactères";
      this.colorPass = "rgb(249, 67, 67)";
    }
    if (this.password == '' || this.password.length >= 8) {
      this.messagePassword = '';
      this.colorPass = '#e7e7e7';
    }
  }

  reseter() {
    // this.reset = localStorage.getItem('reset');
    this.reset = !this.reset;
    // this.reset = localStorage.setItem('reset', this.reset);
  }
  alerter() {
    if (!this.email) {
      this.messageEmail = "l'email est requis";
      this.colorEmail = "rgb(249, 67, 67)";
    }
    if (!this.password) {
      this.messagePassword = "Le mot passe est requis";
      this.colorPass = "rgb(249, 67, 67)";
    }
  }
  connexion() {
    this.auth.connexion(this.email, this.password);
  }

  resetPass(email: any) {
    this.user.motDePasseOublier(email).subscribe(
      response => {
        // console.log(response);
        this.sharedService.alert("success", "Un mail de reinitialisation vous a été envoyé", 'success');
      }
    )
  }
}