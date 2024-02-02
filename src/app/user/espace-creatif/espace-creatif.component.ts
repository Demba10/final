import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProduitsService } from 'src/app/services/produits.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-espace-creatif',
  templateUrl: './espace-creatif.component.html',
  styleUrls: ['./espace-creatif.component.scss']
})


export class EspaceCreatifComponent implements OnInit {

  public fileUploadControl = new FileUploadControl(undefined, FileUploadValidators.filesLimit(2));

  // Produits 
  image!: File;
  nom!: any;
  description!: any;
  userOnline!: any;
  produits!: any[];
  detail!: any;
  emailFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  categories_id: any = 2;
  prod!: any[];

  constructor(
    private produitService: ProduitsService,
    private userService: UsersService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '[]');
    console.log(this.userOnline);
    this.lister();
  }
  open(content: any) {
    this.modalService.open(content);
  }
  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }


  lister() {
    this.userService.getProduits().subscribe(
      response => {
        console.log(response);
        this.produits = response;
        this.prod = this.produits.filter(ele => ele.user_id == Number(this.userOnline.id));
      }
    )
  }
  ajouterProduits() {
    const newProduit = new FormData();
    newProduit.append('image', this.image as Blob);
    newProduit.append('nom', this.nom);
    newProduit.append('description', this.description);
    newProduit.append('categories_id', this.categories_id);

    this.produitService.createproduit(newProduit).subscribe(
      response => {
        this.sharedService.alert('Succes', response.message, 'success');
        this.lister();
      }
    )
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
    const newProduit = new FormData();
    newProduit.append('image', this.image as Blob);
    newProduit.append('nom', this.nom);
    newProduit.append('description', this.description);
    newProduit.append('categories_id', this.categories_id);
    this.produitService.updateproduit(id, newProduit).subscribe(
      response => {
        // console.log(response); 
        this.lister();
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

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}