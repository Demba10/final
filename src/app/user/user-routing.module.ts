import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { UserComponent } from './user.component';
import { AstucesComponent } from './astuces/astuces.component';
import { EchoppeVerteComponent } from './echoppe-verte/echoppe-verte.component';
import { ContactComponent } from './contact/contact.component';
import { JardinotequeComponent } from './jardinoteque/jardinoteque.component';
import { OneAstuceComponent } from './one-astuce/one-astuce.component';
import { EspaceCreatifComponent } from './espace-creatif/espace-creatif.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {
        path: 'accueil',
        component: AccueilComponent
      },
      {
        path: 'astuce', 
        component: AstucesComponent, children: [
          {
            path: 'oneAstuce', component: OneAstuceComponent
          },
          {
            path: '**', redirectTo: '', pathMatch: 'full'
          }
        ]
      },
      {
        path: 'astuces', component: OneAstuceComponent
      },
      {
        path: 'espace-verte', 
        component: EchoppeVerteComponent
      },
      {
        path: 'contact', 
        component: ContactComponent
      },
      {
        path: 'jardinotheque', 
        component: JardinotequeComponent
      },
      {
        path: 'espace-creatif/:id',
        component: EspaceCreatifComponent
      },
      {
        path: '**',
        redirectTo: 'accueil', pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }