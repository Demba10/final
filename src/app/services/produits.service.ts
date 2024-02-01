import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {


  private apiUrl = this.url.getApi();

  constructor(
    private url: ApiService,
    private http: HttpClient
  ) { }


  // Récupérer tous les produits
  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'ListerProduits'); 
  }

  // Récupérer un produit par son ID
  getproduitById(id: number): Observable<any> {
    const url = `${this.apiUrl}VoirDetailProduits/${id}`;
    return this.http.get<any>(url);
  }

  // Créer un nouvel produit
  createproduit(produit: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'PublierProduits', produit);
  }

  // Mettre à jour un produit existant
  updateproduit(id: number, produit: any): Observable<any> {
    const url = `${this.apiUrl}ModifierProduits/${id}`;
    return this.http.post<any>(url, produit);
  }

  // Supprimer un produit par son ID
  deleteproduit(id: number): Observable<any> {
    const url = `${this.apiUrl}SupprimerProduits/${id}`;
    return this.http.delete<any>(url);
  }
}