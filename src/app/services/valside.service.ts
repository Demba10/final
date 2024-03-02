import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValsideService {

  valeur = 1;
  widther = "calc(100% - 200px)";
  constructor() { }

  setSideValeur(val: number) {
    this.valeur = val;
    if (val == 1) {
      this.setWidther("calc(100% - 82px)");
    } else {
      this.setWidther("calc(100% - 200px)");
    }
  }
  getSideValeur() {
    return this.valeur;
  }
  getWidhter() {
    return this.widther;
  }
  setWidther(val: any) {
    this.widther = val;
  }
}
