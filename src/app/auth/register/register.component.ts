import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Debut des propriétés de l'utilisateur
  prenom!: string
  nom!: string
  image!: string
  adresse!: string
  telephone!: string
  email!: string
  password!: string
  // Fin des propriétés de l'utilisateur

  constructor(
    private user: UsersService
  ) {}
  ngOnInit(): void {
    this.user.get('listClients').subscribe(
      response => {console.log(response);
      }
    )
  }
  // Inscriptionde l'utilisateur
  validation() {
    if (!this.prenom || !this.nom || !this.adresse || !this.email || !this.telephone || !this.password) {
      this.showErrorAlert('Veuillez remplir tous les champs.');
      return;
    }
    
    if (this.prenom.trim().length < 2 || /^\s/.test(this.prenom)) {
      this.showErrorAlert('Prénom invalide.');
      return;
    }
  
    if (this.nom.trim().length < 2 || /^\s/.test(this.nom)) {
      this.showErrorAlert('Nom invalide.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      this.showErrorAlert('Adresse email non valide.');
      return;
    };

    const telRegex = /(77|78|70|76)[0-9]{7}/;
    if (this.telephone.length !== 9 || !telRegex.test(this.telephone)) {
      this.showErrorAlert('Numéro de téléphone Invalide.');
      return;
    }
    if (this.adresse.trim().length < 2 || /^\s/.test(this.adresse)) {
      this.showErrorAlert('Adresse invalide.');
      return;
    }

    if (this.password.length < 8) {
      this.showErrorAlert('Mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    this.ajoutUtilisateur();
  }
  showErrorAlert(errorMessage: string) {
    Swal.fire({
      title: 'Erreur',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
  ajoutUtilisateur() {
    const newUser = {
      prenom: this.prenom,
      nom: this.nom,
      image: this.image,
      adresse: this.adresse,
      telephone: this.telephone = this.telephone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4'),
      email: this.email,
      password: this.password
    }
    this.user.post('register', newUser).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          title: 'Inscription réussie',
          text: 'Votre inscription a été enregistrée avec succès!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error => {
        console.log(error);
      }
    )
  }
  // Fin de l'inscription
}