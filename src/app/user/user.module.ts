import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AstucesComponent } from './astuces/astuces.component';
import { EchoppeVerteComponent } from './echoppe-verte/echoppe-verte.component';
import { EspaceCreatifComponent } from './espace-creatif/espace-creatif.component';
import { ContactComponent } from './contact/contact.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { HomeBannerComponent } from '../shared/home-banner/home-banner.component';
import { TitreComponent } from '../shared/utilities/titre/titre.component';
import { ButtonOneComponent } from '../shared/buttons/button-one/button-one.component';
import { ShareBannerComponent } from '../shared/share-banner/share-banner.component';
import { BannerUserComponent } from '../shared/banner-user/banner-user.component';
import { RechercheSectionComponent } from '../shared/recherche-section/recherche-section.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { JardinotequeComponent } from './jardinoteque/jardinoteque.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { OneAstuceComponent } from './one-astuce/one-astuce.component';

@NgModule({
  declarations: [
    UserComponent,
    AccueilComponent,
    AstucesComponent,
    EchoppeVerteComponent,
    EspaceCreatifComponent,
    ContactComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    HomeBannerComponent,
    TitreComponent,
    ButtonOneComponent,
    ShareBannerComponent,
    BannerUserComponent,
    RechercheSectionComponent,
    JardinotequeComponent,
    OneAstuceComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CdkMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatInputModule
  ]
})
export class UserModule { }
