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
import { MatPaginatorModule } from '@angular/material/paginator';

import { NgApexchartsModule } from 'ng-apexcharts';
import { SplineComponent } from './chartes/spline/spline.component';
import { DonutComponent } from './chartes/donut/donut.component';
import { MatButtonModule } from '@angular/material/button';
import { AreaCharteComponent } from './chartes/area-charte/area-charte.component';
import { ProduitsComponent } from './produits/ProduitsComponent';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersComponent } from './users/users.component';
import { MatChipsModule } from '@angular/material/chips';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AddAstuceComponent } from './add-astuce/add-astuce.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CatgoriesComponent } from '../shared/catgories/catgories.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { PaginationAdminComponent } from '../pagination-admin/pagination-admin.component';
import { MatDialogModule, matDialogAnimations } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

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
    UsersComponent,
    AddAstuceComponent,
    CatgoriesComponent,
    PaginationAdminComponent
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
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    MatChipsModule,
    EditorModule,
    MdbCheckboxModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    MatMenuModule,
    HttpClientModule
  ]
})
export class AdminModule { }