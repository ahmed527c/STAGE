import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5294/api/auth';
  private utilisateurConnecte = new BehaviorSubject<Utilisateur | null>(null);
  utilisateurActuel: Utilisateur | null = null;

  constructor(private http: HttpClient) {}

  register(nom: string, email: string, password: string) {
    return this.http.post<Utilisateur>(`${this.apiUrl}/register`, { nom, email, passwordHash: password });
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        const user: Utilisateur = {
          id: res.userId,
          nom: res.userName,
          email: res.email,
          role: res.role
        };
        this.utilisateurConnecte.next(user);

        localStorage.setItem('utilisateurId', user.id.toString());
        localStorage.setItem('nomUtilisateur', user.nom);
        localStorage.setItem('role', user.role);
      }),
      catchError(err => {
        console.error('Erreur login:', err);
        return throwError(() => new Error('Échec de connexion.'));
      })
    );
  }

  logout() {
    this.utilisateurConnecte.next(null);
    localStorage.removeItem('utilisateurId');
    localStorage.removeItem('nomUtilisateur');
    localStorage.removeItem('role');
  }

  getUtilisateurConnecte(): Utilisateur | null {
    return this.utilisateurConnecte.value;
  }

  estConnecte(): boolean {
    return this.utilisateurConnecte.value !== null;
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  
}
