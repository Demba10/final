import { Component, OnInit, inject } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriesService } from 'src/app/services/categories.service';

export interface Categories {
  checkbox: boolean;
  numero: number;
  libelle: string;
}
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-catgories',
  templateUrl: './catgories.component.html',
  styleUrls: ['./catgories.component.scss']
})
export class CatgoriesComponent implements OnInit {

  displayedColumns: string[] = ['checkbox', 'numero', 'libelle'];
  userOnLine!: any;
  categories: Categories[] = [];
  dataSource = new MatTableDataSource<Categories>();

  constructor(
    private categorieService: CategoriesService,
  ) { }
  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '');
    this.listerCategories();
    console.log(this.dataSource);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  listerCategories() {
    this.categorieService.getCategories(this.userOnLine.id).subscribe(
      response => {
        this.categories = response.map((data: any) => ({
          checkbox: false,
          numero: data.id,
          libelle: data.nom
        }));
        this.dataSource.data = this.categories;
      }
    );
  }
}