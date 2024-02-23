import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  alert(titre: any, text: any, icon: any) {
    Swal.fire({
      title: titre,
      text: text,
      icon: icon,
      timer: 1000
    })
  }
}
