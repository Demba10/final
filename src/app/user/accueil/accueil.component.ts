import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { ProduitsService } from 'src/app/services/produits.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  // Injections de dépendances
  private modalService = inject(NgbModal);

  // Etats
  jdn!: any[];
  jdnSome!: any[];
  user: any;
  videos!: any;
  video!: any[];
  jdn_2: any;

  detail: any;
  produits!: any[];
  idProduit = 4;
  articles!: any[];
  jar: any;
  jar_id!: any;
  nbComment!: any;
  nbLike!: any;
  contentArray!: string[];
  randomProductName: any;
  randomProductImage: any;
  astucesArray!: any[];
  astucesContent!: any;
  randomAstuceImage: any;
  randomAstuceName: any;
  randomAstuceId: any;
  // Constructeur

  constructor(
    private articlesServices: ArticlesService,
    private jardierService: UsersService,
    private produitService: ProduitsService,
    private apiUser: UsersService,
    private videoService: VideoService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  displayContent!: any;
  // Comportements
  ngOnInit(): void {
    this.apiUser.getClients().subscribe(
      response => {
        console.log(response);
      }
    )
    this.listeJardiniers();
    this.apiUser.getJardiniers().subscribe(
      response => {
        // console.log((response));
      }
    )
    this.lister();

    // Mettre à jour le contenu à afficher initialement
    this.updateDisplayContent();

    // Mettre à jour le contenu toutes les 24 heures
    const updateInterval = interval(24 * 60 * 60 * 1000);
    updateInterval.subscribe(() => {
      this.updateDisplayContent();
    });
  }

  updateDisplayContent() {
    this.produitService.getProduits().subscribe(
      response => {
        this.contentArray = response;
        const randomIndex = Math.floor(Math.random() * this.contentArray.length);
        this.displayContent = this.contentArray[randomIndex];
        console.log(this.displayContent);
        this.randomProductName = this.displayContent.nom;
        this.randomProductImage = this.displayContent.image;
      }
    )
    this.articlesServices.getArticles().subscribe(
      response => {
        this.astucesArray = response;
        const randomIndex = Math.floor(Math.random() * this.astucesArray.length);
        this.astucesContent = this.astucesArray[randomIndex];
        console.log(response);
        this.randomAstuceName = this.astucesContent.titre;
        this.randomAstuceImage = this.astucesContent.image;
        this.randomAstuceId = this.astucesContent.id;
      }
    )
  }

  listeJardiniers() {
    this.jardierService.getJardiniers().subscribe(
      response => {
        this.jdn = response;
        this.jdn = this.jdn.filter(ele => ele.is_bloquer == 0);
        this.jdnSome = this.jdn.slice(0, 4);
        this.jdnSome = this.jdnSome.filter(ele => ele.is_bloquer == 0)
      }
    )
  }

  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }

  settIdProduit(id: any = this.idProduit) {
    this.idProduit = id;
    this.produitService.getproduitById(this.idProduit).subscribe(
      response => {
        this.detail = response.article;
        console.log(this.detail);

        this.user = this.jdn.find(ele => ele.id == this.detail.user_id);
      },
      error => {
        this.sharedService.alert('', 'Connectez-vous pour charger les details', '')
      }
    )
  }

  lister() {
    this.produitService.getProduits().subscribe(
      response => {
        this.produits = response.slice(0, 6);
      }
    )
    this.articlesServices.getArticles().subscribe(
      response => {
        this.articles = response.slice(0, 6);
      }
    )
    this.videoService.getVideo().subscribe(
      response => {
        this.videos = response;
        this.videos = this.videos.videos;
      }
    )
  }

  detailJardinier1(id: any, nom: any) {
    localStorage.setItem('id_jar', (id));
    this.router.navigate(['../user/details-jardinier', nom]);
  }
  detailJardinier(id: any) {
    localStorage.setItem('id_jar', (id));
    this.router.navigate(['../user/details-jardinier', this.detail.user.prenom]);
  }

  details(id: any) {
    localStorage.setItem('id', id);
  }
}