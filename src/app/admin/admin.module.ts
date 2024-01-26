import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AstucesComponent } from './astuces/astuces.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { NgApexchartsModule } from 'ng-apexcharts';
import { SplineComponent } from './chartes/spline/spline.component';
import { DonutComponent } from './chartes/donut/donut.component';
import { MatButtonModule } from '@angular/material/button';
import { AreaCharteComponent } from './chartes/area-charte/area-charte.component';
import { ProduitsComponent } from './produits/produits.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavbarComponent,
    AstucesComponent,
    DashboardComponent,
    SplineComponent,
    DonutComponent,
    AreaCharteComponent,
    ProduitsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    NgApexchartsModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ]
})
export class AdminModule { }
