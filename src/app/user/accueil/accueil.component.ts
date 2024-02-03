import { Component, OnInit } from '@angular/core';
import { AstucesService } from 'src/app/services/conseils/astuces.service';
import { JardiniersService } from 'src/app/services/jardniers/jardiniers.service';
import { ProduitsService } from 'src/app/services/produits.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  jdn!: any[];
  jdnSome!: any[];
  user: any;
  constructor(
    private articles: AstucesService,
    private jardiniers: JardiniersService,
    private jardierService: UsersService,
    private produitService: ProduitsService,
    private apiUser: UsersService,
  ) { }

  detail: any;
  produits!: any[];
  idProduit = 4;
  mesArticles = this.articles.astuces;

  ngOnInit(): void {
    this.apiUser.getClients().subscribe(
      response => {
        console.log(response);
        this.lister();
      }
    )
    this.listeJardiniers();
    this.apiUser.getJardiniers().subscribe(
      response => {
        // console.log((response));
      }
    )
  }

  currentProduct() {
    let cont = 0;
    this.produits.forEach(element => {
      cont++;
      if (element.selected == true) {
        alert(cont);
      }
    });
  }

  listeJardiniers() {
    this.jardierService.getJardiniers().subscribe(
      response => {
        // console.log(response);
        this.jdn = response;
        this.jdnSome = this.jdn.slice(0, 4);
      }
    )
  }

  settIdProduit(id: any = this.idProduit) {
    this.idProduit = id;
    this.produitService.getproduitById(this.idProduit).subscribe(
      response => {
        console.log(response.article);
        this.detail = response.article;
        this.user = this.jdn.find(ele => ele.id == this.detail.user_id);
        console.log(this.user);
      }
    )
  }
  // getIdProduit() {
  //   return JSON.parse(localStorage.getItem("idprodui") || '');
  // }
  // Les produits
  lister() {
    this.produitService.getProduits().subscribe(
      response => {
        console.log(response);
        this.produits = response.slice(0, 6);
      }
    )
  }
}