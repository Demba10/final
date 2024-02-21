import { Component, OnInit, TemplateRef, inject } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { SharedService } from 'src/app/services/shared.service';

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

  constructor(
    private categorieService: CategoriesService,
    private sharedService: SharedService
  ) { }
  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '[]');
    this.listerCategories();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  openSm(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'sm' });
  }
}