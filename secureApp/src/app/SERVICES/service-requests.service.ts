// services/service-requests.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject,tap  } from 'rxjs';

export interface ServiceRequest {
  id?: number;
  utilisateurId: number;
  serviceType: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  paiement: string;
  urgence: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private apiUrl = 'http://localhost:5294/api/ServiceRequests';

  private serviceRequestNonVide = new BehaviorSubject<boolean>(false);
  serviceRequestNonVide$ = this.serviceRequestNonVide.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.apiUrl);
  }

  updateServiceRequestNonVide(): void {
    this.getAll().pipe(
      tap(data => this.serviceRequestNonVide.next(data.length > 0)),
      
    ).subscribe();
  }


  delete(id: number) 
  {
      return this.http.delete(`${this.apiUrl}/${id}`);


  }
}
