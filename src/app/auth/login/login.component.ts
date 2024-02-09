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
  reset: boolean = false;

  constructor(
    private user: UsersService,
    private auth: AuthentificationService,
    private sharedService: SharedService
  ) { }
  ngOnInit(): void {
    this.user.getClients().subscribe(
      // response => console.log(response)
    )
  }

  reseter() {
    this.reset = !this.reset;
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