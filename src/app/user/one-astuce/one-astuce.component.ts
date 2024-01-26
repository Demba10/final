import { Component } from '@angular/core';
import { AstucesService } from 'src/app/services/conseils/astuces.service';

@Component({
  selector: 'app-one-astuce',
  templateUrl: './one-astuce.component.html',
  styleUrls: ['./one-astuce.component.scss']
})
export class OneAstuceComponent {
  constructor(
    private articles: AstucesService,
  ) { }
  
  mesArticles = this.articles.astuces;
}
