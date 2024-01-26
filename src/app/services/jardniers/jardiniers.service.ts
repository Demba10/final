  import { Injectable } from '@angular/core';
import { ProduitsService } from '../produits/produits.service';

@Injectable({
  providedIn: 'root'
})
export class JardiniersService {

  constructor(private produits : ProduitsService) { }

  jardiniers = [
    {
      id: 1,
      image: 'assets/images/jardinier/jardinier-1.png',
      nom: 'Mansour Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 15
    },
    {
      id: 2,
      image: 'assets/images/jardinier/jardinier-2.png',
      nom: 'Ibrahima Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 15
    },
    {
      id: 3,
      image: 'assets/images/jardinier/jardinier-3.png',
      nom: 'Aboubacar Diop',
      lien: '',
      adresse: 'Mbour',
      produits: 11
    },
    {
      id: 4,
      image: 'assets/images/jardinier/jardinier-1.png',
      nom: 'Pape Matar Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 9
    },
    {
      id: 1,
      image: 'assets/images/jardinier/jardinier-1.png',
      nom: 'Mansour Sall',
      lien: '',
      adresse: 'Mbour',
    },
    {
      id: 2,
      image: 'assets/images/jardinier/jardinier-2.png',
      nom: 'Ibrahima Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 15
    },
    {
      id: 3,
      image: 'assets/images/jardinier/jardinier-3.png',
      nom: 'Aboubacar Diop',
      lien: '',
      adresse: 'Mbour',
      produits: 11
    },
    {
      id: 4,
      image: 'assets/images/jardinier/jardinier-1.png',
      nom: 'Pape Matar Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 9
    },
    {
      id: 1,
      image: 'assets/images/jardinier/jardinier-1.png',
      nom: 'Mansour Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 15
    },
    {
      id: 2,
      image: 'assets/images/jardinier/jardinier-2.png',
      nom: 'Ibrahima Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 15
    },
    {
      id: 3,
      image: 'assets/images/jardinier/jardinier-3.png',
      nom: 'Aboubacar Diop',
      lien: '',
      adresse: 'Mbour',
      produits: 11
    },
    {
      id: 4,
      image: 'assets/images/jardinier/jardinier-1.png',
      nom: 'Pape Matar Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 9
    },
    {
      id: 1,
      image: 'assets/images/jardinier/jardinier-1.png',
      nom: 'Mansour Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 15
    },
    {
      id: 2,
      image: 'assets/images/jardinier/jardinier-2.png',
      nom: 'Ibrahima Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 15
    },
    {
      id: 3,
      image: 'assets/images/jardinier/jardinier-3.png',
      nom: 'Aboubacar Diop',
      lien: '',
      adresse: 'Mbour',
      produits: 11
    },
    {
      id: 4,
      image: 'assets/images/jardinier/jardinier-1.png',
      nom: 'Pape Matar Sall',
      lien: '',
      adresse: 'Mbour',
      produits: 9
    },
  ]
}