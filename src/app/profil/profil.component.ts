import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  userOnLine!: any;
  profil: boolean = true;
  colorParam!: any;
  colorApercu: any = "#4CAF50";

  // Propriétés 
  prenom: any;
  nom: any;
  email: any;
  adresse: any;
  telephone: any;
  password: any;
  confirmerPassword: any;
  image!: File;
  imageUrl: any;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '');
    console.log(this.userOnLine);
    this.remplirValeur();
  }
  remplirValeur() {
    this.prenom = this.userOnLine.prenom;
    this.nom = this.userOnLine.nom;
    this.email = this.userOnLine.email;
    this.adresse = this.userOnLine.adresse;
    this.telephone = this.userOnLine.telephone;
  }
  switch() {
    this.profil = true;
    this.colorApercu = "#4CAF50";
    this.colorParam = "#000";
  }
  switch2() {
    this.profil = false;
    this.colorApercu = "#000";
    this.colorParam = "#4CAF50";
  }

  modifierProfil() {
    let formData = new FormData();
    formData.append("image", this.image as Blob);
    formData.append("prenom", this.prenom);
    formData.append("nom", this.nom);
    formData.append("adresse", this.adresse);
    formData.append("telephone", this.telephone);
    {
      this.userService.modifierProfil(this.userOnLine.id, formData).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            title: 'Modification réussie',
            text: 'Votre compte a été modifier avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }, error => {
          console.log(error);
        }
      )
    }
  }
  // gestion de l'image 
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
    this.readImage();
  }
  readImage() {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };

    reader.readAsDataURL(this.image);
  }

}