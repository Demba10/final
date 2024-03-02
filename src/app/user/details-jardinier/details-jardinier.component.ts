import { Component, TemplateRef } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitsService } from 'src/app/services/produits.service';
import { UsersService } from 'src/app/services/users.service';

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
  jar_id!: any;
  jar: any;
  View!: any[];
  userView: any;
  produitPerUser!: any[];

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
  detailsProduit(id: any, userid?: any) {
    this.produitService.getproduitById(id).subscribe(
      response => {
        this.detail = response.article;
        console.log(this.detail);
      }
    )
    this.userService.getJardiniers().subscribe(
      response => {
        this.View = response;
        this.userView = this.View.find(ele => ele.id == userid);
        console.log(this.userView);
        this.produitPerUser = this.produits.filter(ele => ele.user_id == userid)
      }
    )
  }
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  // Messages
  // Les messages
  openVerticallyCentered(content: TemplateRef<any>) {
    // this.modalService.open(content, { centered: true });
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }
  consulterProfil(id: any) {
    // this.userService.getProfil(id).subscribe(
    //   response => {
    //     // console.log(response);
    //     // this.jar_id = localStorage.setItem('id_jar', id);
    //   }
    // )
    // this.showDetails = true;
    localStorage.setItem('id_jar', (id));
    this.jar_id = localStorage.getItem('id_jar');
    this.jar = this.jardiniers.find(ele => ele.id == id);
    // this.router.navigate(['../user/details-jardinier', this.jar.prenom]);
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
