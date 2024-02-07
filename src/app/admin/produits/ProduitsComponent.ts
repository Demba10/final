import { Component, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitsService } from 'src/app/services/produits.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import { MyErrorStateMatcher } from 'src/app/user/espace-creatif/espace-creatif.component';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-produits',
    templateUrl: './produits.component.html',
    styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent {
    // displayedColumns: string[] = ['image', 'libelle', 'note', 'selected'];
    // mesProduits!: any;
    // constructor(
    //   private produits: ProduitsService,
    //   private produitServices: ProduitsService
    // ) { }
    // @ViewChild(MatPaginator) paginator!: MatPaginator;
    // ngOnInit(): void {
    //   setTimeout(() => {
    //     this.mesProduits.paginator = this.paginator;
    //   });
    //   this.listerProduits();
    // }
    // listerProduits() {
    //   this.produitServices.getProduits().subscribe(
    //     response => {
    //       console.log(response);
    //       this.mesProduits = response;
    //     }
    //   )
    // }
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
    users!: any[];
    us!: any;
    filtre!: any;
    filteredItems: any;
    searchTerm: any;
    saveProd!: any[];

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
    openSm(content: TemplateRef<any>) {
        this.modalService.open(content, { size: 'md', scrollable: true });
    }

    lister() {
        this.userService.getProduits().subscribe(
            response => {
                console.log(response);
                this.prod = response;
                this.saveProd = response;
            }
        );
    }
    listerUsers(id: any) {
        this.userService.getJardiniers().subscribe(
            response => {
                this.users = response;
                this.us = this.users.find(ele => ele.id == id);
            }
        );
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
                );
            }
        });
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
                console.log(response);
                this.detail = response.article;
            }
        );
    }
    // Méthode de filtrage
    filterItems() {
        this.prod = this.saveProd;
        this.prod = this.saveProd.filter(
            ele => ele.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
}
