import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface ServiceRequest {
  utilisateurId: number;
  serviceType: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  paiement: string;
  urgence: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:5294/api/ServiceRequests';

  private notifCount = new BehaviorSubject<number>(0);
  notifCount$ = this.notifCount.asObservable();

  private requests: ServiceRequest[] = [];
  private requests$ = new BehaviorSubject<ServiceRequest[]>([]);

  constructor(private http: HttpClient) {}

  increment() {
    this.notifCount.next(this.notifCount.value + 1);
  }

  reset() {
    this.notifCount.next(0);
  }

  getRequests() {
    return this.requests$.asObservable();
  }

  /**
   * Envoie une nouvelle demande au backend et la stocke localement.
   * Ajoute automatiquement utilisateurId à partir de localStorage.
   */
  addRequest(formData: Omit<ServiceRequest, 'utilisateurId'>) {
    const utilisateurIdStr = localStorage.getItem('utilisateurId');
    const utilisateurId = utilisateurIdStr ? parseInt(utilisateurIdStr, 10) : 0;

    const completeRequest: ServiceRequest = {
      utilisateurId,
      ...formData
    };

    return this.http.post<ServiceRequest>(this.apiUrl, completeRequest).pipe(
      tap((response) => {
        this.requests.push(response);
        this.requests$.next([...this.requests]);
        this.increment();
      })
    ).subscribe({
      next: () => console.log('ServiceRequest envoyé au backend avec succès'),
      error: (err) => console.error('Erreur lors de l\'envoi :', err)
    });
  }

  getAllRequestsFromBackend() {
  return this.http.get<ServiceRequest[]>(this.apiUrl);
}

supprimerRequest(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
