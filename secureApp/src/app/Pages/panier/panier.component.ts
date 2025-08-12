// panier.component.ts
import { Component, OnInit } from '@angular/core';
import { PanierItem } from 'src/app/Les_interfaces/panier-item';
import { PanierService } from 'src/app/SERVICES/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panier: PanierItem[] = [];
  total: number = 0;

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.loadPanier();

  }

  loadPanier() {
    const utilisateurId = Number(localStorage.getItem('utilisateurId'));
  
    this.panierService.getPanier(utilisateurId).subscribe({
      next: (data) => {
        this.panier = data;
        this.calcTotal();
      },
      error: () => alert('Erreur lors du chargement du panier')
    });
  }

  calcTotal() {
    this.total = this.panier.reduce((acc, item) => {
      const prix = item.article?.prixApres ?? 0;
      return acc + prix * item.quantite;
    }, 0);
  }

  
supprimerArticle(item: PanierItem) {
  const utilisateurId = Number(localStorage.getItem('utilisateurId'));
  this.panierService.supprimerArticle(utilisateurId, item.articleId).subscribe({
    next: () => {
      this.loadPanier();
      this.panierService.updatePanierNonVide(utilisateurId);
    },
    error: () => alert('Erreur lors de la suppression.')
  });
}

confirmerAchat() {
  const utilisateurId = Number(localStorage.getItem('utilisateurId'));
  if (!utilisateurId) {
    alert('Utilisateur non connecté.');
    return;
  }
this.panierService.confirmerAchat(utilisateurId).subscribe({
  next: (message) => {
    alert('✅ ' + message);
    this.loadPanier();
    this.panierService.updatePanierNonVide(utilisateurId);
  },
  error: (err) => {
    alert('❌ ' + (err.error || 'Erreur lors de la confirmation.'));
  }
});

}





  
}
