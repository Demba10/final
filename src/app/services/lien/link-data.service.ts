import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkDataService {

  constructor(
  ) { }

  sidebar_data = [
    {
      id: 1,
      title: "Accueil",
      lien: "accueil",
      isActive: '#4CAF50'
    },
    {
      id: 2,
      title: "Astuces",
      lien: "astuces",
      isActive : '#000'
    },
    {
      id: 3,
      title: "Echoppe Verte",
      lien: "espace-verte",
      isActive : '#000'
    },
    {
      id: 4,
      title: "Jardinothèque",
      lien: "jardinotheque",
      isActive : '#000'
    },
    {
      id: 5,
      title: "Contactez-nous",
      lien: "contact",
      isActive : '#000'
    }
  ]

  // url() : Observable<any> {
  //   let a = document.body.baseURI;
  //   let url = a.lastIndexOf('/');
  //   return <any> (url);
  // }

  changeColor(id: any): Observable<any> {
    // const found = this.sidebar_data.filter(ele => ele.id == id);
    this.sidebar_data.forEach(element => {
      element.isActive = '#000'; // Default color
      if (element.id == id) {
        element.isActive = '#4CAF50'; // Change color for the matching element
      }
    });
    return <any>('Succès');
  }

  sidebar_cta = [
    {
      icon: "fa-solid fa-magnifying-glass"
    },
    {
      icon: "fa-regular fa-user"
    }
  ]
}