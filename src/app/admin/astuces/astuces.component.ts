import { formatDate } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concat } from 'rxjs';
import { Article } from 'src/app/modele/article.modele';
import { ArticlesService } from 'src/app/services/articles.service';
import { CommentairesService } from 'src/app/services/commentaires.service';
import { AstucesService } from 'src/app/services/conseils/astuces.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-astuces',
  templateUrl: './astuces.component.html',
  styleUrls: ['./astuces.component.scss']
})
export class AstucesComponent {

  // Form data 

  private modalService = inject(NgbModal);
  filtre: boolean = true;
  displayedColumns: string[] = ['#', 'image', 'user_name', 'like', 'comment', 'titre'];
  dataSource = new MatTableDataSource<any>(ASTUCES);
  articleSliste!: any[];
  fullScreenPopup: boolean = false;
  content: string = 'content';

  // Les propriétés
  titre!: string;
  image!: File;
  contenu!: string;
  editorHeight!: number;
  details: any;
  utilisateurs: any[] = [];

  // paginations 
  // array of all items to be paged

  // pager object
  pager: any = {};

  // paged items
  pagedItems!: any[];


  extractTitle(): string {
    let a = this.contenu.indexOf('<')
    return this.contenu.charAt(a);
  }
  // 
  constructor(
    private articles: AstucesService,
    private art: ArticlesService,
    private us: UsersService,
    private pagerService: PaginationService,
    private sharedService: SharedService,
    private commentairesService: CommentairesService
  ) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  step: any;
  commentaires!: any[];

  ngOnInit(): void {
    this.dataSource.data = this.articles.astuces;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    this.listeArticles();
    this.titre = this.contenu;
    this.user();
  }
  // Issue des service

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.articleSliste.length, page);

    // get current page of items
    this.pagedItems = this.articleSliste.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.step = this.commentaires.length
  }

  etape1() {
    this.step = 1;
  }
  etape2() {
    this.step = 2;
  }

  listeArticles() {
    this.art.getArticles().subscribe(
      resoponse => {
        this.articleSliste = resoponse;
        // console.log(resoponse);
        this.setPage(1);
      }
    )
  }

  ajouterArticle() {

    let t = this.contenu.indexOf('>');
    let l = this.contenu.substring(t).indexOf('<')
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.contenu.substring(t + 1, l + 2);

    let tm = this.contenu.search(/<img src="/);
    const nA = new FormData();
    nA.append('titre', this.titre);
    nA.append('image', this.image as Blob);
    nA.append('contenue', this.contenu);

    this.art.createArticle(nA).subscribe(
      response => {
        this.articleSliste.push(nA)
        this.setPage(this.pager.pages.length)
        Swal.fire({
          title: 'Success',
          text: response.message,
          icon: 'success'
        })
        this.contenu = '';
      },
      error => {
        alert(this.contenu.substring(tm + 10, this.contenu.substring(tm + 10).indexOf('"') + tm + 10));
        Swal.fire({
          title: 'error',
          text: error.error.error,
          icon: 'error'
        })
        l
      }
    )
  }
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' });
  }
  openFullscreen(full: TemplateRef<any>) {
    this.modalService.open(full, { size: 'xl' });
  }
  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }
  open(content: any) {
    this.modalService.open(content);
  }
  detailArticle(id: any) {
    this.art.getArticleById(id).subscribe(
      response => {
        // console.log(response.article);
        this.details = response.article;
        localStorage.setItem('id_article', response.article.id);
        localStorage.setItem('titre_article', response.article.titre);
        this.commentaires = this.details.commentaires;
        this.contenu = this.details.contenue;
      }
    )
  }
  supprimerArticle(id: any) {
    Swal.fire({
      title: "Etes-vous sure?",
      text: "Cet article sera supprimé définitivement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimé",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.art.deleteArticle(id).subscribe(
          response => {
            // console.log(response);
            // this.pagedItems = this.articleSliste.filter(ele => ele.id !== id);
            this.listeArticles();
            this.setPage(this.pager.currentPage)
            this.sharedService.alert('', response.message, 'success');
          }
        )
      }
    });
  }
  modifierArticle() {
    const nA = new FormData();
    let temp = localStorage.getItem('id_article');
    let tem = JSON.parse(localStorage.getItem('titre_article') || '');
    nA.append('titre', tem);
    nA.append('image', this.image as Blob);
    nA.append('contenue', this.contenu);
    this.art.updateArticle(Number(temp), nA).subscribe(
      response => {
        console.log(response);
      }
    )
  }
  clients!: any[];
  jardiniers!: any[];
  cl: any;
  jar: any;
  user() {
    this.us.getClients().subscribe(
      response => {
        this.clients = response;
        // console.log(response);
      }
    )
    this.us.getJardiniers().subscribe(
      resposne => {
        this.jardiniers = resposne;
        // console.log(resposne);
      }
    )
    // console.log(user);

  }
  userActif(id: any) {
    this.cl = this.clients.find(ele => ele.id == id)
  }
  filtrer() {
    this.filtre = !this.filtre;
  }
  supprimerCommentaire(id: any) {
    Swal.fire({
      title: "Etes-vous sure?",
      text: "C commentaire sera supprimé définitivement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimé",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentairesService.supprimerComentaire(id).subscribe(
          response => {
            this.commentaires = this.commentaires.filter(ele => ele.id !== id);
            this.sharedService.alert('', response.message, 'success');
          }
        )
      }
    }
    )
  }
  
}
export interface Astuces {
  id: number,
  user_name: string,
  image: string,
  titre: string,
  date: string,
  like: number,
  message: number,
  user_image: string,
  sous_titre: string
}

const ASTUCES: Astuces[] = [
  {
    id: 1,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-1.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 2,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-2.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 3,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-3.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 4,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-4.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 5,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-5.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 6,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-6.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
]