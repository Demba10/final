import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitsService } from 'src/app/services/produits/produits.service';

@Component({
  selector: 'app-echoppe-verte',
  templateUrl: './echoppe-verte.component.html',
  styleUrls: ['./echoppe-verte.component.scss']
})
export class EchoppeVerteComponent implements OnInit {

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
