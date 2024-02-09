import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ProduitsService } from 'src/app/services/produits.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clients !: any[];
  jardiniers!: any[];
  produits!: any[];
  sommeUser!: any;
  articles!: any[];

  constructor(
    private user: UsersService,
    private produit: ProduitsService,
    private article: ArticlesService
  ) { }

  ngOnInit(): void {
    this.listeClient();
    this.listeJardinier();
    this.listeProduit();
    this.listeArticle();
    this.sommeUser = this.jardiniers.length + this.clients.length;
  }

  listeClient() {
    this.user.getClients().subscribe(
      response => {
        // console.log("Clients ", response);
        this.clients = response;
      }
    )
  }
  listeJardinier() {
    this.user.getJardiniers().subscribe(
      response => {
        // console.log("Jardiniers ", response);
        this.jardiniers = response;
      }
    )
  }
  listeProduit() {
    this.produit.getProduits().subscribe(
      response => {
        console.log("Produits ", response);
        this.produits = response;
      }
    )
  }
  listeArticle() {
    this.article.getArticles().subscribe(
      response => {
        console.log('articles ', response)
        this.articles = response;
      }
    )
  }
}