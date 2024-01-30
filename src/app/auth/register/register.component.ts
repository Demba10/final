import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Debut des propriétés de l'utilisateur
  prenom!: string
  nom!: string
  image!: any
  adresse!: string
  telephone!: string
  email!: string
  password!: string
  step: number =  1;
  // Fin des propriétés de l'utilisateur
  public fileUploadControl = new FileUploadControl(undefined, FileUploadValidators.filesLimit(2));

  constructor(
    private user: UsersService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user.get('listClients').subscribe(
      response => {console.log(response);
      }
    )
  }
  goStep1() {
    this.step = 1;
  }
  goStep2() {
    this.step = 2;
  }
  goStep3() {
    this.step = 3;
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
    let formData = new FormData();
    formData.append("image", this.image);
    formData.append("prenom", this.prenom);
    formData.append("nom", this.nom);
    formData.append("adresse", this.adresse);
    formData.append("telephone", this.telephone);
    formData.append("email", this.email);
    formData.append("password", this.password);
    this.user.post('register', formData).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          title: 'Inscription réussie',
          text: 'Votre inscription a été enregistrée avec succès!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // this.router.navigate(['/login'])
      }
    )
  }
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }
  // Fin de l'inscription  = this.telephone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4')
}