import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { ShareBannerComponent } from './share-banner/share-banner.component';
import { ButtonOneComponent } from './buttons/button-one/button-one.component';
import { TitreComponent } from './utilities/titre/titre.component';
import { BannerUserComponent } from './banner-user/banner-user.component';
import { RechercheSectionComponent } from './recherche-section/recherche-section.component';



@NgModule({
  declarations: [
    HomeBannerComponent,
    ShareBannerComponent,
    ButtonOneComponent,
    TitreComponent,
    BannerUserComponent,
    RechercheSectionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
