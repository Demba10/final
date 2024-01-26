import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  // Méthode pour effectuer une requête GET
  get(resource: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${resource}`);
  }

  // Méthode pour effectuer une requête POST
  post(resource: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${resource}`, data);
  }

  // Méthode pour effectuer une requête PUT
  put(resource: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${resource}`, data);
  }
}