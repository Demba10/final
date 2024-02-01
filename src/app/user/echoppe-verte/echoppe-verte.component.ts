import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ImageService } from 'src/app/services/image.service';
import { ProduitsService } from 'src/app/services/produits.service';
 
@Component({
  selector: 'app-echoppe-verte',
  templateUrl: './echoppe-verte.component.html',
  styleUrls: ['./echoppe-verte.component.scss']
})
export class EchoppeVerteComponent implements OnInit {
 
  produits!: any;
  imageUrl!: any;
  // displayedColumns: string[] = ['image', 'libelle', 'note', 'selected'];
  // mesProduits = new MatTableDataSource<any>();
 
  constructor(
    // private produits: ProduitsService,
    private produitService: ProduitsService,
    private imageService: ImageService
  ) { }
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  ngOnInit(): void {
    this.listerProduits();
  }
  listerProduits() {
    this.produitService.getProduits().subscribe(
      response => {
        console.log(response);
        this.produits = response;
      }
    )
  }
}