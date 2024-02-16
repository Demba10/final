import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, of } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { AstucesService } from 'src/app/services/conseils/astuces.service';
import { JardiniersService } from 'src/app/services/jardniers/jardiniers.service';
import { ProduitsService } from 'src/app/services/produits.service';
import { UsersService } from 'src/app/services/users.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  jdn!: any[];
  jdnSome!: any[];
  user: any;
  videos!: any;
  video!: any[];
  jdn_2: any;
  constructor(
    // private articles: AstucesService,
    private http: HttpClient,
    private articlesServices: ArticlesService,
    private jardierService: UsersService,
    private produitService: ProduitsService,
    private apiUser: UsersService,
    private videoService: VideoService
  ) { }

  detail: any;
  produits!: any[];
  idProduit = 4;
  articles!: any;


  private cache: { product: any, lastUpdate: number } = { product: null, lastUpdate: 0 };
  private readonly cacheValidity = 24 * 60 * 60 * 1000;

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

  listeJardiniers() {
    this.jardierService.getJardiniers().subscribe(
      response => {
        // console.log(response);
        this.jdn = response;
        this.jdn = this.jdn.filter(ele => ele.is_bloquer == 0);
        this.jdnSome = this.jdn.slice(0, 4);
        this.jdnSome = this.jdnSome.filter(ele => ele.is_bloquer == 0)
      }
    )
  }
  private modalService = inject(NgbModal);

  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl', scrollable: true });
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
        // console.log(response);
        this.produits = response.slice(0, 6);

      }
    )
    this.articlesServices.getArticles().subscribe(
      response => {
        // console.log(response);
        this.articles = response.slice(0, 6);
      }
    )
    this.videoService.getVideo().subscribe(
      response => {
        this.videos = response;
        this.videos = this.videos.videos;
        console.log(this.videos);
      }
    )
  }
  details(id: any) {
    localStorage.setItem('id', id);
  }
}