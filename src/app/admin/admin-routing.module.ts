import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AstucesComponent } from './astuces/astuces.component';
import { ProduitsComponent } from './produits/produits.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'articles', component: AstucesComponent
      },
      {
        path: 'produit', component: ProduitsComponent
      },
      {
        path: 'utilisateurs', component: UsersComponent
      },
      {
        path: '**', redirectTo:'dashboard', pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }