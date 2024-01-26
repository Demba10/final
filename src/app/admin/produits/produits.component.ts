import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitsService } from 'src/app/services/produits/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent {
  displayedColumns: string[] = ['image', 'libelle', 'note', 'selected'];
  mesProduits = new MatTableDataSource<any>();

  constructor(private produits: ProduitsService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    // Initialisez vos données ici
    this.mesProduits.data = this.produits.produits;
    setTimeout(() => {
      this.mesProduits.paginator = this.paginator;
    });
  }
}
