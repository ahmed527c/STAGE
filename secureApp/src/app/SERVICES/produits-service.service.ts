import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articles } from '../Les_interfaces/articles';  

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private apiUrl = 'http://localhost:5294/api/Articles';  

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.apiUrl);
  }

  ajouterProduit(produit: Articles): Observable<Articles> {
    return this.http.post<Articles>(this.apiUrl, produit);
  }

  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

updateArticle(id: number, article: Articles): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, article);
}

  
}
