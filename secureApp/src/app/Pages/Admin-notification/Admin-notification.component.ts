import { Component, OnInit } from '@angular/core';
import { ServiceRequest, ServiceRequestService } from 'src/app/SERVICES/service-requests.service';

@Component({
  selector: 'app-Admin-notification',
  templateUrl: './Admin-notification.component.html',
  styleUrls: ['./Admin-notification.component.css']
})
export class Admin_notificationComponent  {
  demandes: ServiceRequest[] = [];
  demandesVisibles: boolean[] = [];
  erreur = '';

  constructor(private serviceRequestService: ServiceRequestService) {
    this.loadDemandes();
  }



  loadDemandes(): void {
    this.serviceRequestService.getAll().subscribe({
      next: data => {
        this.demandes = data;
        // Initialiser le tableau de visibilité : tout caché au départ
        this.demandesVisibles = new Array(this.demandes.length).fill(false);
      },
      error: err => {
        console.error('Erreur chargement demandes:', err);
        this.erreur = 'Erreur lors du chargement des demandes.';
      }
    });
  }

  toggleDemandeVisibility(index: number): void {
    this.demandesVisibles[index] = !this.demandesVisibles[index];
  }


  
supprimerDemande(id?: number): void {
  const confirmation = confirm('Voulez-vous vraiment supprimer cette demande ?');
  if (confirmation)

    {
      this.serviceRequestService.delete(id!).subscribe({
    next: () => {
      this.loadDemandes(); 

      // **Important : on met à jour le flag pour la notif**
      this.serviceRequestService.updateServiceRequestNonVide();
    },
    error: () => {
      this.erreur = 'Erreur lors de la suppression de la demande.';
    }
  });
    }

  
}



}
