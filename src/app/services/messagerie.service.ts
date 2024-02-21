import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  private apiUrl = this.url.getApi();
  websocket!: WebSocket;

  constructor(
    private url: ApiService,
    private http: HttpClient
  ) { }

  // Mettre à jour un produit existant
  envyerMessage(id: number, contenue: any): Observable<any> {
    const url = `${this.apiUrl}EnvoyerMessage/${id}`;
    return this.http.post<any>(url, { contenue });
  }

  // Récupérer tous les messages spefiques a un user
  recuperMessageParId(id: number): Observable<any> {
    const url = `${this.apiUrl}RecupererMessage/${id}`;
    return this.http.get<any>(url);
  }
  // Supprimer un produit par son ID
  deleteproduit(id: number): Observable<any> {
    const url = `${this.apiUrl}SupprimerProduits/${id}`;
    return this.http.delete<any>(url);
  }
}
