import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { ShareBannerComponent } from './share-banner/share-banner.component';
import { ButtonOneComponent } from './buttons/button-one/button-one.component';
import { TitreComponent } from './utilities/titre/titre.component';
import { BannerUserComponent } from './banner-user/banner-user.component';
import { RechercheSectionComponent } from './recherche-section/recherche-section.component';
import { CatgoriesComponent } from './catgories/catgories.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    HomeBannerComponent,
    ShareBannerComponent,
    ButtonOneComponent,
    TitreComponent,
    BannerUserComponent,
    RechercheSectionComponent,
    CatgoriesComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class SharedModule { }
