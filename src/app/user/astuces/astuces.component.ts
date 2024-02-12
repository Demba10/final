import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesService } from 'src/app/services/articles.service';
import { CommentairesService } from 'src/app/services/commentaires.service';
import { AstucesService } from 'src/app/services/conseils/astuces.service';
import { SharedService } from 'src/app/services/shared.service';
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
  commentaires!: any[];
  nbComents!: any;
  id!: any;
  astuc !: any;
  details: any;
  contenue: any = '';
  note: any;
  clients!: any[];
  jardiniers!: any[];
  client: any;
  comment: any;
  mergedUsers: any[] = [];

  constructor(
    private astuces: AstucesService,
    private articles: ArticlesService,
    private userService: UsersService,
    private commentaireService: CommentairesService,
    private sharedService: SharedService
  ) { }
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.articles.getArticleById(this.id).subscribe(
      response => {
        this.details = response.article;
        this.nbComents = this.details.commentaires.length;
        // console.log(response);
        document.getElementById('contenu')!.innerHTML = (this.details.contenue)
      }
    );
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '[]');
    this.merger();
  }
  merger() {
    this.userService.getJardiniers().subscribe(jardiniers => {
      this.mergedUsers = this.mergedUsers.concat(jardiniers);

      this.userService.getClients().subscribe(clients => {
        this.mergedUsers = this.mergedUsers.concat(clients);
        console.log(this.mergedUsers);
      });
    });
  }
  listerCommentaire(id: any) {
    this.articles.getArticleById(id).subscribe(
      response => {
        this.commentaires = response.article.commentaires;
        console.log(response);
      }
    )
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
        this.commentaireService.supprimerComentaire(id).subscribe(
          response => {
            this.commentaires = this.commentaires.filter(ele => ele.id !== id);
            this.sharedService.alert('', response.message, 'success');
            this.nbComents--;
          }
        )
      }
    }
    )
  }
  chargerInfosComment(id: any) {
    this.comment = this.commentaires.filter(ele => ele.id == id);
    this.contenue = this.comment.contenue;
    alert(this.contenue);
  }
  modifierCommentaire(id: any) {
    this.commentaireService.supprimerComentaire(id).subscribe(
      response => {
        console.log();
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
        this.viderChamps();
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