import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  
  private apiUrl = this.url.getApi();

  constructor(
    private url: ApiService,
    private http: HttpClient
  ) { }


  // Récupérer les commentaires d'un article
  getComments(id : any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `ListerCommentaires/${id}`);
  }

  // Récupérer un article par son ID
  getArticleById(id: number): Observable<any> {
    const url = `${this.apiUrl}VoirDetailArticle/${id}`;
    return this.http.get<any>(url);
  }

  // Créer un nouveau commentaire
  createComment(comment: any, id: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `AjouterCommentaire/${id}`, comment);
  }

  // Mettre à jour un article existant
  updateArticle(id: number): Observable<any> {
    const comment = "ModifierCommentaire";
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, comment);
  }

  // Supprimer un article par son ID
  supprimerComentaire(id: number): Observable<any> {
    const url = `${this.apiUrl}SupprimerCommentaire/${id}`;
    return this.http.delete<any>(url);
  }
}
