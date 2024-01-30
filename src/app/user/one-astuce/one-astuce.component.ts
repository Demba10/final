import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesService } from 'src/app/services/articles.service';
import { AstucesService } from 'src/app/services/conseils/astuces.service';

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

  constructor(
    private articles: AstucesService,
    private astuces: ArticlesService,
  ) { }

  ngOnInit(): void {
    this.astuces.getArticles().subscribe(
      response => {
        console.log(response);
        this.articleList = response;
      }
    )
  }
  openFullscreen(content: TemplateRef<any>) {
    this.modalService.open(content, { fullscreen: true });
  }
  details(id: any) {
    localStorage.setItem('id', id);
    this.astuces.getArticleById(id).subscribe(
      response => {
        this.articleOne = response;
        localStorage.setItem('article', JSON.stringify(response));
      }
    )
    
  }
}