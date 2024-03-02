import { Component, OnInit } from '@angular/core';
import { ValsideService } from 'src/app/services/valside.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  valeur: any;
  widther: any;
  constructor(
    private sideValeur: ValsideService
  ) { }
  ngOnInit(): void {
    this.valeur = this.sideValeur.getSideValeur();
    this.widther = this.sideValeur.getWidhter();
  }
}
