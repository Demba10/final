import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { UserComponent } from './user.component';
import { AstucesComponent } from './astuces/astuces.component';
import { EchoppeVerteComponent } from './echoppe-verte/echoppe-verte.component';
import { ContactComponent } from './contact/contact.component';
import { JardinotequeComponent } from './jardinoteque/jardinoteque.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {
        path: 'accueil',
        component: AccueilComponent
      },
      {
        path: 'astuces', 
        component: AstucesComponent
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
        path: '**',
        component: AccueilComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }