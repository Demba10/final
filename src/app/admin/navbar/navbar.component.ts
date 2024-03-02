import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ValsideService } from 'src/app/services/valside.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  valeur = 1;
  widther = "calc(100% - 200px)";
  lefter = "200px";

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private sideValeur: ValsideService
  ) { }

  deconnexon() {
    this.sharedService.alert('success', 'Déconnexion réussie', 'success');
    this.router.navigate(['/auth']);
    localStorage.setItem('userOnline', '');
    localStorage.setItem('token', '');
  }

  ngOnInit(): void {

  }
  changerValeurUn() {
    this.sideValeur.setSideValeur(1);
    this.widther = this.sideValeur.getWidhter();
    this.valeur = this.sideValeur.getSideValeur();
    this.sideValeur.setWidther("calc(100% -200px)");
    this.lefter = "82px";
  }
  changerValeurDeux() {
    this.sideValeur.setSideValeur(2);
    this.valeur = this.sideValeur.getSideValeur();
    this.widther = this.sideValeur.getWidhter();
    this.sideValeur.setWidther("calc(100% - 82px)");
    this.lefter = "200px";
  }
}
