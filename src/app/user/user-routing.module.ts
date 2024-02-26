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
import { ChatComponent } from './chat/chat.component';
import { authGuard } from '../guards/auth.guard';
import { DetailsJardinierComponent } from './details-jardinier/details-jardinier.component';
import { ProfilComponent } from '../profil/profil.component';

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
        path: 'chat', 
        component: ChatComponent
      },
      {
        path: 'espace-creatif/:id',
        canActivate: [authGuard],
        component: EspaceCreatifComponent
      },
      {
        path: 'details-jardinier/:id',
        component: DetailsJardinierComponent
      },
      {
        path: 'profil/:id',
        component: ProfilComponent
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