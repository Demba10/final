import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

export interface Categories {

  created_at: string;
  id: number;
  nom: string;
  updated_at: string;
  user_id: number
}

@Component({
  selector: 'app-catgories',
  templateUrl: './catgories.component.html',
  styleUrls: ['./catgories.component.scss']
})
export class CatgoriesComponent implements OnInit {

  private modalService = inject(NgbModal);

  displayedColumns: string[] = ['numero', 'libelle', 'checkbox'];
  userOnLine!: any;
  categories!: Categories[];
  dataSource = new MatTableDataSource<Categories>();
  cat: any;
  nom!: any;
  id: any;

  constructor(
    private categorieService: CategoriesService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '[]');
    this.listerCategories();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  chargerInfos(id: any) {
    this.nom = this.dataSource.data.filter(ele => ele.id === id).map(ele => ele.nom);
    this.id = id;
  }
  modCategorie() {
    this.categorieService.modifierCategorie(this.id, this.nom).subscribe(
      response => {
        this.listerCategories();
        this.vider();
      }
    )
  }
  listerCategories() {
    this.categorieService.getCategories().subscribe(
      response => {
        this.cat = response;
        this.cat = this.cat.categories;
        this.dataSource.data = this.cat;
        console.log(this.dataSource.data);
      }
    );
  }
  vider() {
    this.nom = null;
  }
  ajoutCategorie() {
    const newCat = {
      nom: this.nom,
      user_id: this.userOnLine.id
    }
    this.categorieService.ajouterCategorie(newCat).subscribe(
      response => {
        console.log(response);
        this.sharedService.alert('', response.message, 'success');
        this.listerCategories();
      }
    )
  }
  supprimer(id: any) {
    Swal.fire({
      title: "Etes-vous sure?",
      text: "Ce catégorie sera supprimé définitivement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimé",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categorieService.supprimerCategorie(id).subscribe(
          response => {
            this.listerCategories();
            this.sharedService.alert('success', response.message, 'success');
          }
        )
      }
    });
  }
  openSm(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'sm' });
  }
}