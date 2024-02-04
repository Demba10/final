import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesService } from 'src/app/services/articles.service';
import { CommentairesService } from 'src/app/services/commentaires.service';
import { AstucesService } from 'src/app/services/conseils/astuces.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-astuces',
  templateUrl: './astuces.component.html',
  styleUrls: ['./astuces.component.scss']
})
export class AstucesComponent implements OnInit {

  mesAstuces = this.astuces.astuces;
  astuce = this.mesAstuces.find(ele => ele.id == 1);
  private offcanvasService = inject(NgbOffcanvas);
  articleOne: any;
  userOnLine!: any;
  commentaires!: any;
  nbComents!: any;
  id!: any;
  astuc !: any;
  details: any;
  contenue: any = '';
  note: any;
  clients!: any[];
  jardiniers!: any[];
  client: any;

  constructor(
    private astuces: AstucesService,
    private articles: ArticlesService,
    private userService: UsersService,
    private commentaireService: CommentairesService
  ) { }
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.articles.getArticleById(this.id).subscribe(
      response => {
        this.details = response.article;
        this.nbComents = this.details.commentaires.length;
        console.log(response);
        document.getElementById('contenu')!.innerHTML = (this.details.contenue)
      }
    );
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '[]');
  }
  listerCommentaire(id: any) {
    this.articles.getArticleById(id).subscribe(
      response => {
        this.commentaires = response.article.commentaires;
        console.log(response);
      }
    )
  }
  listerUser() {
    this.userService.getClients().subscribe(
      response => {
        this.clients = response;
        // this.clients = this.commentaires.find(ele => ele.i_)
      }
    )
    this.userService.getJardiniers().subscribe(
      response => {
        this.jardiniers = response;
      }
    )
  }
  user(id: any) {
    this.client = this.clients.find(ele => ele.id == id);
    console.log(this.client);

  }
  ajouterCommentaire() {
    const newCommment = {
      contenue: this.contenue,
      note: this.note
    }
    this.commentaireService.createComment(newCommment, this.id).subscribe(
      response => {
        Swal.fire({
          // title: 'Success',
          text: response.message,
          // icon: 'success'
        })
        console.log(response);
        this.listerCommentaire(this.id);
        this.nbComents++;
        this.viderChamps()
      }
    )
  }
  viderChamps() {
    this.contenue = '';
    this.note = 0;
  }
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}