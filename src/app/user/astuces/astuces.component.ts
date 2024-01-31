import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesService } from 'src/app/services/articles.service';
import { AstucesService } from 'src/app/services/conseils/astuces.service';

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
  id!: any;
  astuc !: any;
  details: any;

  constructor(
    private astuces: AstucesService,
    private articles: ArticlesService
  ) { }
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.articles.getArticleById(this.id).subscribe(
      response => {
        this.details = response.article;
        alert(this.details.contenue)
      }
    )

    document.querySelector('.contenu')?.appendChild(this.details.contenue)
    console.log(
      document.querySelector('.contenu')!.textContent 
    );
    
  }
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}