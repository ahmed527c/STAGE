import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/Les_interfaces/articles';
import { ProduitsService } from 'src/app/SERVICES/produits-service.service';

@Component({
  selector: 'app-Espace_admin.',
  templateUrl: './Espace_admin.component.html',
  styleUrls: ['./Espace_admin.component.css']
})
export class Espace_adminComponent {
  produit: Articles = {
    titre: '',
    type: '',
    prixAvant: undefined,
    prixApres: 0,
    quantite: 0,
    quantiteAchetee: 1,
    image: ''
  };

  articles: Articles[] = [];

  message = '';
  erreur = '';

  constructor(private produitsService: ProduitsService) {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.produitsService.getProduits().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: () => {
        this.erreur = 'Erreur lors du chargement des produits.';
      }
    });
  }

  onSubmit() {
    this.message = '';
    this.erreur = '';

    this.produit.image = 'assets/produit_images/' + this.produit.image;

    this.produitsService.ajouterProduit(this.produit).subscribe({
      next: () => {
        this.message = 'Produit ajouté avec succès !';

        this.produit = {
          titre: '',
          type: '',
          prixAvant: undefined,
          prixApres: 0,
          quantite: 0,
          quantiteAchetee: 1,
          image: ''
        };

        this.chargerProduits();
      },
      error: () => {
        this.erreur = 'Erreur lors de l\'ajout du produit.';
      }
    });
  }

  modifier(article: Articles) {
    this.message = '';
    this.erreur = '';

    this.produitsService.updateArticle(article.id!, article).subscribe({
      next: () => {
        this.message = 'Produit modifié avec succès !';
        this.chargerProduits();
      },
      error: () => {
        this.erreur = 'Erreur lors de la modification du produit.';
      }
    });
  }

  supprimerProduit(id?: number): void {
    if (id === undefined) {
      alert('ID produit invalide');
      return;
    }

    this.produitsService.supprimerProduit(id).subscribe({
      next: () => {
        this.message = 'Produit supprimé avec succès !';
        this.chargerProduits();
      },
      error: () => {
        this.erreur = 'Erreur lors de la suppression du produit.';
      }
    });
  }
}
