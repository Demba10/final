import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor() { }

  produits = [
    {
      image: "assets/images/boutique/1.svg",
      libelle: "Amaryllis",
      note: 5,
      selected: true
    },
    {
      image: "assets/images/boutique/2.svg",
      libelle: "Bleuet",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/3.svg",
      libelle: "Zinnia",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/4.svg",
      libelle: "Edelweiss",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/5.svg",
      libelle: "Wisteria",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/6.svg",
      libelle: "Tulipe",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/1.svg",
      libelle: "Amaryllis",
      note: 5,
      selected: true
    },
    {
      image: "assets/images/boutique/2.svg",
      libelle: "Bleuet",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/3.svg",
      libelle: "Zinnia",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/4.svg",
      libelle: "Edelweiss",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/5.svg",
      libelle: "Wisteria",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/6.svg",
      libelle: "Tulipe",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/1.svg",
      libelle: "Amaryllis",
      note: 5,
      selected: true
    },
    {
      image: "assets/images/boutique/2.svg",
      libelle: "Bleuet",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/3.svg",
      libelle: "Zinnia",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/4.svg",
      libelle: "Edelweiss",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/5.svg",
      libelle: "Wisteria",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/6.svg",
      libelle: "Tulipe",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/1.svg",
      libelle: "Amaryllis",
      note: 5,
      selected: true
    },
    {
      image: "assets/images/boutique/2.svg",
      libelle: "Bleuet",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/3.svg",
      libelle: "Zinnia",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/4.svg",
      libelle: "Edelweiss",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/5.svg",
      libelle: "Wisteria",
      note: 5,
      selected: false
    },
    {
      image: "assets/images/boutique/6.svg",
      libelle: "Tulipe",
      note: 5,
      selected: false
    }
  ]
  defaultProduct = this.produits.find(ele => ele.selected == true);
}