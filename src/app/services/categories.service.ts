import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = this.url.getApi();

  constructor(
    private url: ApiService,
    private http: HttpClient
  ) { }


  // Récupérer tous les produits
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}listCategorie`);
  }

  // Récupérer un produit par son ID
  getproduitById(id: number): Observable<any> {
    const url = `${this.apiUrl}VoirDetailProduits/${id}`;
    return this.http.get<any>(url);
  }

  // Créer un nouvel produit
  ajouterCategorie(produit: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'AjouterCategorie', produit);
  }

  // Mettre à jour un produit existant
  updateproduit(id: number, produit: any): Observable<any> {
    const url = `${this.apiUrl}ModifierProduits/${id}`;
    return this.http.post<any>(url, produit);
  }

  // Supprimer un produit par son ID
  supprimerCategorie(id: number): Observable<any> {
    const url = `${this.apiUrl}SupprimerCategorie/${id}`;
    return this.http.delete<any>(url);
  }
}
