import { Component, OnInit } from '@angular/core';
import { AstucesService } from 'src/app/services/conseils/astuces.service';
import { JardiniersService } from 'src/app/services/jardniers/jardiniers.service';
import { ProduitsService } from 'src/app/services/produits/produits.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(
    private articles: AstucesService,
    private jardiniers: JardiniersService,
    private produits: ProduitsService,
    private apiUser: UsersService
  ) { }
  
  mesArticles = this.articles.astuces;
  mesJardiniers = this.jardiniers.jardiniers.slice(0, 4);
  mesProduits = this.produits.produits.slice(0, 6);
  defaultProduct = this.produits.defaultProduct;

  ngOnInit(): void {
    this.apiUser.getClients().subscribe(
      response => {
        console.log(response);
      }
    )
    this.apiUser.getJardiniers().subscribe(
      response => {
        console.log((response));
        
      }
    )
  }
  
  currentProduct() {
    let cont = 0;
    this.mesProduits.forEach(element => {
      cont++;
      if (element.selected == true) {
        alert(cont);
      }
    });
  }
}