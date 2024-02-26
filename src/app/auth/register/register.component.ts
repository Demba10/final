import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Debut des propriétés de l'utilisateur
  prenom!: string
  nom!: string
  adresse!: string
  email!: string
  telephone!: string
  password!: string
  image!: File
  step: number = 1;
  isClient: any = undefined;
  dispmiss: boolean = true;
  valider_1: any = 0;
  // Fin des propriétés de l'utilisateur

  // Propriétés de validation
  colorPrenom: string = '';
  messagePrenom: string = '';
  colorNom: string = '';
  messageNom: string = '';
  colorAdresse: string = '';
  messageAdresse: string = '';
  colorEmail: string = '';
  messageEmail: string = '';
  colorTelephone: string = '';
  messageTelephone: string = '';
  messagePassword: string = '';
  colorPassword: string = '';
  messageImage: string = '';
  colorImage: string = '';

  public fileUploadControl = new FileUploadControl(undefined, FileUploadValidators.filesLimit(2));
  imageUrl: any;

  constructor(
    private user: UsersService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.user.get('listClients').subscribe(
      response => {
        console.log(response);
      }
    )
  }


  goStep1() {
    this.step = 1;
  }
  testNom() {
    const valide = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ-']*$/;
    // const sansChiffres = /^\D*$/;

    if (/^\s/.test(this.nom)) {
      this.colorNom = "rgb(249, 67, 67)";
      this.messageNom = "Le nom ne peut pas commencer par un espace.";
    } else if (!valide.test(this.nom.trim())) {
      this.colorNom = "rgb(249, 67, 67)";     
      this.messageNom = "Format invalide!";
    }
    // else if (!sansChiffres.test(this.nom.trim())) {
    //   this.colorNom = "#f4a332";
    //   this.messageNom = "Le nom ne peut pas comporter de chiffres";
    // }
    else if (this.nom.trim().length < 2) {
      this.colorNom = "#f4a332";
      this.messageNom = "Le nom doit comporter au minimum deux caractères";
    } else {
      this.colorNom = "#4CAF50";
      this.messageNom = "Format valide";
      return true;
    }
    if (this.nom == '') {
      this.colorNom = "#e7e7e7";
      this.messageNom = "";
    }
    return false;
  }

  testPrenom() {
    const valide = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ-']*$/;
    const sansChiffres = /^\D*$/;

    if (/^\s/.test(this.prenom)) {
      this.colorPrenom = "rgb(249, 67, 67)";
      this.messagePrenom = "Le prénom ne peut pas commencer par un espace";
    } else if (!valide.test(this.prenom.trim())) {
      this.colorPrenom = "rgb(249, 67, 67)";
      this.messagePrenom = "Format invalide!";
    }
    // else if (!sansChiffres.test(this.prenom.trim())) {
    //   this.colorPrenom = "#f4a332";
    //   this.messagePrenom = "Le prénom ne doit pas comporter de chiffres";
    // }
    else if (this.prenom.trim().length < 2) {
      this.colorPrenom = "#f4a332";
      this.messagePrenom = "Le prénom doit comporter au minimum deux caractères.";
    } else {
      this.colorPrenom = "#4CAF50";
      this.messagePrenom = "Format valide!";
      return true;
    }
    if (this.prenom == '') {
      this.colorPrenom = "#e7e7e7";
      this.messagePrenom = "";
    }
    return false;
  }

  testAdresse() {
    if (/^\s/.test(this.adresse)) {
      this.colorAdresse = "rgb(249, 67, 67)";
      this.messageAdresse = "L'adresse ne peut pas commencer par un espace";
    } else if (/^\d/.test(this.adresse)) {
      this.colorAdresse = "rgb(249, 67, 67)";
      this.messageAdresse = "L'adresse ne peut pas commencer par un chiffre";
    } else if (this.adresse.trim().length < 2) {
      this.colorAdresse = "#f4a332";
      this.messageAdresse = "Au minimum deux caractères!";
    } else {
      this.colorAdresse = "#4CAF50";
      this.messageAdresse = "Format valide!";
      return true;
    }
    if (this.adresse == '') {
      this.colorAdresse = "#e7e7e7";
      this.messageAdresse = "";
    }
    return false;
  }

  goStep2() {
    if (!this.prenom) {
      this.colorPrenom = "rgb(249, 67, 67)";
      this.messagePrenom = "Le prénom est requis.";
    }
    if (!this.nom) {
      this.colorNom = "rgb(249, 67, 67)";
      this.messageNom = "Le nom est requis.";
    }
    if (!this.adresse) {
      this.colorAdresse = "rgb(249, 67, 67)";
      this.messageAdresse = "L' email est requis.";
    }
    if (this.testPrenom() && this.testAdresse() && this.testNom()) {
      this.step = 2;
    }
  }
  testEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      this.messageEmail = "Vueillez fournir une adresse email valide";
      this.colorEmail = "rgb(249, 67, 67)";
    } else if (emailRegex.test(this.email)) {
      this.messageEmail = "Format valide!";
      this.colorEmail = "#4CAF50";
      return true;
    }
    if (this.email == '') {
      this.messageEmail = "";
      this.colorEmail = '#e7e7e7';
    }
    return false;
  }
  testTelephone() {
    const telRegex = /^(77|78|70|76)[0-9]{7}/;
    const val = this.telephone.length == 9 && telRegex.test(this.telephone);
    const tel = Number(this.telephone.slice(0, 2)) == 77 || Number(this.telephone.slice(0, 2)) == 78 || Number(this.telephone.slice(0, 2)) == 70 || Number(this.telephone.slice(0, 2)) == 76;
    if (val) {
      this.colorTelephone = "#4CAF5";
      this.messageTelephone = "Format valide!";
      return true;
    }
    if (!val) {
      this.colorTelephone = "rgb(249, 67, 67)";
      this.messageTelephone = "Format de téléphone invalide";
    }
    if (!tel) {
      this.messageTelephone = "Commencez par 70 ou 76 ou 77 ou 78";
      this.colorTelephone = "rgb(249, 67, 67)";
    } else if (tel) {
      this.messageTelephone = "";
      this.colorTelephone = '#e7e7e7';
    }
    if (!Number(this.telephone)) {
      this.messageTelephone = "Caracteres inacceptable";
      this.colorTelephone = "rgb(249, 67, 67)";
    }
    if (this.telephone == '') {
      this.messageTelephone = "";
      this.colorTelephone = '#e7e7e7';
    }
    return false;
  }
  testPassword() {
    if (this.password.length < 8) {
      this.colorPassword = "#f4a332";
      this.messagePassword = "Le mot de passe trop court.";
    } else if (this.password.length >= 8) {
      this.colorPassword = "#4CAF50";
      this.messagePassword = "Format valide!";
      return true;
    }
    if (this.password == '') {
      this.colorPassword = "#e7e7e7";
      this.messagePassword = "";
    }
    return false;
  }
  goStep3() {
    this.colorTelephone = "rgb(249, 67, 67)";
    if (!this.telephone) {
      this.messageTelephone = "Le téléphone est requis.";
    }
    if (!this.password) {
      this.colorPassword = "rgb(249, 67, 67)";
      this.messagePassword = "Le mot de passe est requis.";
    }
    if (!this.email) {
      this.colorEmail = "rgb(249, 67, 67)";
      this.messageEmail = "L' email est requis.";
    }
    if (this.testEmail() && this.testTelephone() && this.testPassword()) {
      this.step = 3;
    }
  }
  goStep32() {
    this.colorTelephone = "rgb(249, 67, 67)";
    if (!this.telephone) {
      this.messageTelephone = "Le téléphone est requis.";
    }
    if (!this.password) {
      this.colorPassword = "rgb(249, 67, 67)";
      this.messagePassword = "Le mot de passe est requis.";
    }
    if (!this.email) {
      this.colorEmail = "rgb(249, 67, 67)";
      this.messageEmail = "L' email est requis.";
    }
    if (this.testEmail() && this.testTelephone() && this.testPassword()) {
      this.ajoutUtilisateurClient();
    }
  }
  switchClient() {
    this.isClient = 1;
    this.dispmiss = false;
  }
  switchJardinier() {
    this.isClient = 2;
    this.dispmiss = false;
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
    } else {
      this.valider_1++;
    }

    if (this.nom.trim().length < 2 || /^\s/.test(this.nom)) {
      this.showErrorAlert('Nom invalide.');
      return;
    } else {
      this.valider_1++;
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
    } else {
      this.valider_1++;
    }

    if (this.password.length < 8) {
      this.showErrorAlert('Mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    this.ajoutUtilisateur();
  }
  terminerUser() {
    this.goStep32();
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
    if (!this.image) {
      this.messageImage = "L'image est requis";
      this.colorImage = "rgb(249, 67, 67)";
      return;
    }

    let formData = new FormData();
    formData.append("image", this.image as Blob);
    formData.append("prenom", this.prenom);
    formData.append("nom", this.nom);
    formData.append("adresse", this.adresse);
    formData.append("telephone", this.telephone);
    formData.append("email", this.email);
    formData.append("password", this.password);
    if (!this.image) {
      this.messageImage = "L'image est requis";
      this.colorImage = "rgb(249, 67, 67)";
    } else {
      this.user.post('register', formData).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            title: 'Inscription réussie',
            text: 'Votre inscription a été enregistrée avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/auth'])
        }, error => {
          console.log(error);
        }
      )
    }
  }
  ajoutUtilisateurClient() {
    let formData = new FormData();
    formData.append("image", this.image as Blob);
    formData.append("prenom", this.prenom);
    formData.append("nom", this.nom);
    formData.append("adresse", this.adresse);
    formData.append("telephone", this.telephone);
    formData.append("email", this.email);
    formData.append("password", this.password);
    {
      this.user.post('register', formData).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            title: 'Inscription réussie',
            text: 'Votre inscription a été enregistrée avec succès!',
            icon: 'success',
            timer: 2000,
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/auth'])
        }, error => {
          console.log(error);
        }
      )
    }
  }
  default() {
    this.dispmiss = true;
    this.isClient = undefined;
  }
  @ViewChild(ImageCropperComponent, { static: false }) imageCropper!: ImageCropperComponent;

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
  imageCropped(event: ImageCroppedEvent) {
    this.imageUrl = event.base64;
  }

  cropImage() {
    this.imageCropper.crop();
  }


  // show password
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  // Fin de l'inscription  = this.telephone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4')
}