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
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { DetailsJardinierComponent } from './details-jardinier/details-jardinier.component';
import { ProfilComponent } from '../profil/profil.component';
import { TalkjsComponent } from './talkjs/talkjs.component';
import { ChatComponent } from './chat/chat.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from '../pagination/pagination.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


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
    OneAstuceComponent,
    DetailsJardinierComponent,
    ProfilComponent,
    TalkjsComponent,
    ChatComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CdkMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    EditorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgbDropdown,
    HttpClientModule,
    ImageCropperModule
  ]
})
export class UserModule { }
