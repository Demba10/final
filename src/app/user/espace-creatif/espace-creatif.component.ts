import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProduitsService } from 'src/app/services/produits.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import { VideoService } from 'src/app/services/video.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-espace-creatif',
  templateUrl: './espace-creatif.component.html',
  styleUrls: ['./espace-creatif.component.scss']
})


export class EspaceCreatifComponent implements OnInit {

  public fileUploadControl = new FileUploadControl(undefined, FileUploadValidators.filesLimit(2));

  titre: any = 'Produits';
  changer: boolean = false;
  image!: File;
  video!: File;
  nom!: any;
  description!: any;
  userOnline!: any;
  produits!: any[];
  detail!: any;
  emailFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  categories_id: any = 1;
  prod!: any[];
  option: any = 1;
  ajouter: any;
  modifier: any;
  categories!: any[];
  userOnLine: any;
  cat!: any[];
  longueur!: any;
  dataSource: any;
  videos: any;
  activerButton: boolean = false;

  constructor(
    config: NgbModalConfig,
    private produitService: ProduitsService,
    private userService: UsersService,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private videoSeervice: VideoService,
    private categorieService: CategoriesService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '[]');
    // console.log(this.userOnline);
    this.lister();
    this.listerVideo();
    this.longueur = this.categories.length;
    this.listerCategories();
  }
  open(content: any) {
    this.modalService.open(content);
    this.ajouter = true;
    this.modifier = false;
  }
  open2(content: any) {
    this.modalService.open(content);
    this.ajouter = false;
    this.modifier = true;
  }
  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  openSm(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'md', scrollable: true });
  }
  switchProduit() {
    this.changer = !this.changer;
  }
  vider() {
    this.nom = '';
    this.description = '';
  }
  lister() {
    this.userService.getProduits().subscribe(
      response => {
        // console.log(response);
        this.produits = response;
        this.prod = this.produits.filter(ele => ele.user_id == Number(this.userOnline.id));
      }
    )
  }
  listerVideo() {
    this.videoSeervice.getVideo().subscribe(
      response => {
        this.videos = response;
        this.videos = this.videos.videos;
        console.log(this.videos);
      }
    )
  }
  listerCategories() {
    this.categorieService.getCategories().subscribe(
      response => {     
        this.cat = response;
        console.log(this.cat);
      }
    );
  }
  ajouterVideo() {
    const newProduit = new FormData();
    newProduit.append('video', this.video as Blob);
    newProduit.append('titre', this.nom);
    newProduit.append('description', this.description);
    newProduit.append('user_id', this.userOnline.id);

    this.videoSeervice.publierVideo(newProduit).subscribe(
      response => {
        this.sharedService.alert('Succes', response.message, 'success');
        // console.log(response);
        this.vider();
      }
    )
  }
  validerImage() {
    if (this.image) {
      return true;
    } else {
      return false;
    }
  }
  validerNom() {
    if (this.nom) {
      return true;
    } else {
      return false;
    }
  }
  validerCategorie() {
    if (this.categories_id) {
      return true;
    } else {
      return false;
    }
  }
  ajouterProduits() {
    this.option = 1;
    const newProduit = new FormData();
    newProduit.append('image', this.image as Blob);
    newProduit.append('nom', this.nom);
    newProduit.append('description', this.description);
    newProduit.append('categories_id', this.categories_id);

    if (!this.image || !this.nom || !this.categories_id) {
      this.sharedService.alert('Erreur', 'vueillez remplir les champs', 'error')
    } else {
      this.produitService.createproduit(newProduit).subscribe(
        response => {
          // this.sharedService.alert('Succes', response.message, 'success');
          this.lister();
          // console.log(response);
          this.vider();
        }, error => {
          this.sharedService.alert('error', "erreur", 'error');
          console.log(error);
        }
      )
    }
  }
  SupprimerProduit(id: any) {
    Swal.fire({
      title: "Etes-vous sure?",
      text: "Ce produit sera supprimé définitivement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimé",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.deleteproduit(id).subscribe(
          response => {
            // console.log(response);
            this.lister();
            this.sharedService.alert('success', response.message, 'success');
          }
        )
      }
    });
  }
  openEditProduit(id: any) {
    this.detailsProduit(id);
    this.nom = this.detail.nom;
    this.description = this.detail.description;
    this.image = this.description.image;
  }
  modifierProduit(id: any) {
    this.option = 2;
    const newProduit = new FormData();
    newProduit.append('image', this.image ? this.image : this.description.image as Blob);
    newProduit.append('nom', this.nom);
    newProduit.append('description', this.description);
    newProduit.append('categories_id', this.categories_id);
    this.produitService.updateproduit(id, newProduit).subscribe(
      response => {
        // console.log(response); 
        this.lister();
        this.vider();
      }
    )
  }
  detailsProduit(id: any) {
    this.produitService.getproduitById(id).subscribe(
      response => {
        // console.log(response);
        this.detail = response.article;
      }
    )
  }
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }
  getFile2(event: any) {
    console.warn(event.target.files[0]);
    this.video = event.target.files[0] as File;
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}