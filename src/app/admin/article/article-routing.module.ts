import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ListeArticleComponent } from './liste-article/liste-article.component';

const routes: Routes = [
  {
    path: '', component: ArticleComponent, children: [
      {
        path: 'articles', component: ListeArticleComponent
      },
      {
        path: '**', redirectTo: 'articles', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
