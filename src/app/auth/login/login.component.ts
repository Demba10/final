import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    private user : UsersService
  ) {}
  ngOnInit(): void {
      
  }

  connexion() {
    const auth = { emai: this.email, password: this.password };
    this.user.post('login', auth).subscribe(
      response => {console.log(response);
      }
    )
  }
}