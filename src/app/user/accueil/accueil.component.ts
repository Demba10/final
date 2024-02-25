import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  articles!: any;

  // Constructeur

  constructor(
    private articlesServices: ArticlesService,
    private jardierService: UsersService,
    private produitService: ProduitsService,
    private apiUser: UsersService,
    private videoService: VideoService,
    private sharedService: SharedService
  ) { }

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
  
  details(id: any) {
    localStorage.setItem('id', id);
  }
}