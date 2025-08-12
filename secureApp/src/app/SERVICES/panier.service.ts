import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PanierItem } from '../Les_interfaces/panier-item';



@Injectable({ providedIn: 'root' })
export class PanierService {
  private apiUrl = 'http://localhost:5294/api/panier';

  private panierNonVideSubject = new BehaviorSubject<boolean>(false);
  panierNonVide$ = this.panierNonVideSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPanier(utilisateurId: number): Observable<PanierItem[]> {
    return this.http.get<PanierItem[]>(`${this.apiUrl}/${utilisateurId}`);
  }

  ajouterArticle(item: { utilisateurId: number; articleId: number; quantite: number }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/ajouter`, item);
  }

  supprimerArticle(utilisateurId: number, articleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${utilisateurId}/article/${articleId}`);
  }

 confirmerAchat(utilisateurId: number): Observable<string> {
  return this.http.post(
    `${this.apiUrl}/confirmer/${utilisateurId}`,
    null, // <-- envoyer null au lieu de {}
    { responseType: 'text' } // <-- important pour gérer la réponse texte
  );
}

  // Méthode pour charger le panier et mettre à jour la notif
  updatePanierNonVide(utilisateurId: number): void {
    this.getPanier(utilisateurId).subscribe(panier => {
      this.panierNonVideSubject.next(panier.length > 0);
    }, () => {
      this.panierNonVideSubject.next(false);
    });
  }
}
export { PanierItem };

