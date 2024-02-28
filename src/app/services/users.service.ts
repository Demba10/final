import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = this.apiUrl2.getApi();

  constructor(
    private http: HttpClient,
    private apiUrl2: ApiService
  ) { }

  // Méthode pour effectuer une requête GET
  get(resource: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${resource}`);
  }
  // Fonction pour récupérer les clients depuis l'API Laravel
  getClients(): Observable<any> {
    const resource = 'listClients';
    return this.http.get<any>(`${this.apiUrl}${resource}`);
  }

  allUser(): Observable<any> {
    const resource = 'AllUsers';
    return this.http.get<any>(`${this.apiUrl}${resource}`);
  }

  bloquerUsers(id: any): Observable<any> {
    const resource = 'blockUser';
    return this.http.post<any>(`${this.apiUrl}${resource}/${id}`, null);
  }

  debloquerUsers(id: any): Observable<any> {
    const resource = 'debloquerUser';
    return this.http.post<any>(`${this.apiUrl}${resource}/${id}`, null);
  }

  // Fonction pour récupérer les clients depuis l'API Laravel
  getProduits(): Observable<any> {
    const resource = 'ListerProduit';
    return this.http.get<any>(`${this.apiUrl}${resource}`);
  }

  // Fonction pour récupérer les Jardiniers depuis l'API Laravel
  getJardiniers(): Observable<any> {
    const resource = 'ListJardiniers';
    return this.http.get<any>(`${this.apiUrl}${resource}`);
  }

  getProfil(id: any): Observable<any> {
    const resource = 'ConsulterProfile';
    return this.http.get<any>(`${this.apiUrl}${resource}/${id}`);
  }

  getToken() {
    let headers = new HttpHeaders();
    headers = headers.set('token', '' + localStorage.getItem("token"));
    return { headers: headers };
  }

  // Méthode pour effectuer une requête POST
  motDePasseOublier(email: string): Observable<any> {
    const resource = "MotDepasseOublier";
    return this.http.post(`${this.apiUrl}${resource}`, { email });
  }

  // Méthode pour effectuer une requête POST
  post(resource: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${resource}`, data);
  }

  // Méthode pour effectuer une requête POST
  newlatters(data: any): Observable<any> {
    const resource = "AjouterNewletters";
    return this.http.post(`${this.apiUrl}${resource}`, data);
  }

  // Méthode pour effectuer une requête POST
  deconnexion(data: any): Observable<any> {
    const resource = 'logout'
    return this.http.post(`${this.apiUrl}${resource}`, data);
  }

  // Méthode pour effectuer une requête PUT
  put(resource: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${resource}`, data);
  }
}