import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification-service.service';
import { AuthService, Utilisateur } from '../SERVICES/auth.service';
import { Router } from '@angular/router';
import { PanierService } from '../SERVICES/panier.service';
import { ServiceRequestService } from '../SERVICES/service-requests.service'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  utilisateurActuel: Utilisateur | null = null; 

  panierNonVide: boolean = false;
  demandesNonVides: boolean = false; 

  constructor(
    public notifService: NotificationService,
    public auth: AuthService,
    private router: Router,
    private panierService: PanierService,
    private serviceRequestService: ServiceRequestService
  ) {}

  ngOnInit(): void {
    const utilisateurId = Number(localStorage.getItem('utilisateurId'));

    // 🔁 On récupère l'utilisateur connecté au démarrage
    this.utilisateurActuel = this.auth.getUtilisateurConnecte();

    if (utilisateurId) {
      this.panierService.updatePanierNonVide(utilisateurId);
      this.panierService.panierNonVide$.subscribe(flag => {
        this.panierNonVide = flag;
      });
    }

    if (this.isAdmin()) {
      this.serviceRequestService.updateServiceRequestNonVide();
      this.serviceRequestService.serviceRequestNonVide$.subscribe(flag => {
        this.demandesNonVides = flag;
      });
    }
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  deconnexion() {
    this.auth.logout();
    this.utilisateurActuel = null; // 👈 on réinitialise l'utilisateur local
    this.router.navigate(['/login']);
  }
}
