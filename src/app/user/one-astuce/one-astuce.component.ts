import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesService } from 'src/app/services/articles.service';
import { CommentairesService } from 'src/app/services/commentaires.service';
import { AstucesService } from 'src/app/services/conseils/astuces.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-one-astuce',
  templateUrl: './one-astuce.component.html',
  styleUrls: ['./one-astuce.component.scss']
})
export class OneAstuceComponent implements OnInit {
  private modalService = inject(NgbModal);
  articleOne: any;
  mesArticles = this.articles.astuces;
  articleList!: any[];
  other!: any[];
  mergedUsers: any[] = [];
  likeCount: any[] = [];
  searchTerm: any;
  like: any;

  // paginations 
  pager: any = {};
  itemsPerPage = 9;
  currentPage = 1;

  // paged items
  pagedItems!: any[];
  userOnline: any;

  constructor(
    private articles: AstucesService,
    private astuces: ArticlesService,
    private users: UsersService,
    private commentaireService: CommentairesService
  ) { }

  ngOnInit(): void {
    this.astuces.getArticles().subscribe(
      response => {
        console.log(response);
        this.articleList = response;
        this.other = response;
      }
    )
    this.merger();
  }
  merger() {
    this.users.getJardiniers().subscribe(jardiniers => {
      this.mergedUsers = this.mergedUsers.concat(jardiniers);

      this.users.getClients().subscribe(clients => {
        this.mergedUsers = this.mergedUsers.concat(clients);
        console.log(this.mergedUsers);
        
      });
    });
  }
  openFullscreen(content: TemplateRef<any>) {
    this.modalService.open(content, { fullscreen: true });
  }
  filterItems() {
    this.articleList = this.other;
    this.articleList = this.other.filter(
      ele => ele.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) || ele.updated_at.includes(this.searchTerm));
  }
  details(id: any) {
    localStorage.setItem('id', id);
  }

  // Pagination
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  get paginatedProduits(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.articleList.slice(startIndex, endIndex);
  }
}