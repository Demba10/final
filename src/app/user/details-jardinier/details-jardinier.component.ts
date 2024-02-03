import { Component, TemplateRef } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitsService } from 'src/app/services/produits.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-jardinier',
  templateUrl: './details-jardinier.component.html',
  styleUrls: ['./details-jardinier.component.scss']
})
export class DetailsJardinierComponent {

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
  id_jar: any;
  jardiniers!: any[];
  jardinier: any;

  constructor(
    private produitService: ProduitsService,
    private userService: UsersService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '[]');
    this.id_jar = localStorage.getItem('id_jar');
    console.log(this.userOnline);
    this.lister();
  }
  open(content: any) {
    this.modalService.open(content);
  }
  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  openSm(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'md', scrollable: true });
  }

  lister() {
    this.userService.getProduits().subscribe(
      response => {
        // console.log(response);
        this.produits = response;
        this.prod = this.produits.filter(ele => ele.user_id == this.id_jar);
      }
    )
    this.userService.getJardiniers().subscribe(
      response => {
        this.jardiniers = response;
        this.jardinier = this.jardiniers.find(ele => ele.id == this.id_jar);
      }
    )
  }
  openEditProduit(id: any) {
    this.detailsProduit(id);
    this.nom = this.detail.nom;
    this.description = this.detail.description;
    this.image = this.description.image;
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
