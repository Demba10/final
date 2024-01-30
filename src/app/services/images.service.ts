import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private apiUrl = this.api.getApi();

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) { }


  getImage(filename: string): Observable<Blob> {
    return this.http.get(this.apiUrl + filename, { responseType: 'blob' });
  }


  // getImage() {
  //   return this.apiUrl + "storage/app/public/";
  // }
}
