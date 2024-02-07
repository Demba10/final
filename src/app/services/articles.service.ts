import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private apiUrl = this.url.getApi();

  constructor(
    private url: ApiService,
    private http: HttpClient
  ) { }


  // Récupérer tous les articles
  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'ListeArticle');
  }

  // Récupérer un article par son ID
  getArticleById(id: number): Observable<any> {
    const url = `${this.apiUrl}VoirDetailArticle/${id}`;
    return this.http.get<any>(url);
  }

  // Créer un nouvel article
  createArticle(article: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'createArticle', article);
  }

  // Mettre à jour un article existant
  updateArticle(id: number, article: any): Observable<any> {
    const url = `${this.apiUrl}updateArticle/${id}`;
    return this.http.post<any>(url, article);
  }

  // Supprimer un article par son ID
  deleteArticle(id: number): Observable<any> {
    const url = `${this.apiUrl}destroyArticle/${id}`;
    return this.http.delete<any>(url);
  }
}
