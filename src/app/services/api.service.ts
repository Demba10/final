import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // En local
  getApi() {
    return 'http://127.0.0.1:8000/api/';
  }

  // En production
  // getApi() {
  //   return 'https://www.bak92147.simplonfabriques.com/api/';
  // }
}