import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/Les_interfaces/articles';
import { PanierService } from 'src/app/SERVICES/panier.service';
import { ProduitsService } from 'src/app/SERVICES/produits-service.service';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']  
})
export class ProduitsComponent implements OnInit {
  filtreActif: string = 'tous';
  rechercheTexte: string = '';
  articles: Articles[] = []; 
  panierNonVide: any;

  constructor(
    private produitsService: ProduitsService,
    private panierService: PanierService  ) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
  this.produitsService.getProduits().subscribe({
    next: (data) => {

      for (let article of data) {
        article.quantiteAchetee = 1;
      }

      this.articles = data;
    },
   
  });
}



  get articlesFiltres(): Articles[] {
    return this.articles.filter(article => {
      const categorieOk = this.filtreActif === 'tous' || article.type === this.filtreActif;
      const texteOk = article.titre.toLowerCase().includes(this.rechercheTexte.toLowerCase());
      return categorieOk && texteOk;
    });
  }

  filtrerParType(type: string) {
    this.filtreActif = type;
  }

acheter(article: Articles): void {
  const qte = article.quantiteAchetee || 1;
  const utilisateurId = Number(localStorage.getItem('utilisateurId'));

  if (qte > article.quantite) {
    alert("Quantité demandée supérieure au stock disponible.");
    return;
  }

  const confirmation = confirm(`Voulez-vous vraiment ajouter ${qte} x ${article.titre} au panier ?`);
  if (!confirmation) return;

  const item = {
    utilisateurId,
    articleId: article.id!,
    quantite: qte
  };

  this.panierService.ajouterArticle(item).subscribe({
    next: () => {
      alert(`✅ Article ajouté au panier : ${article.titre}`);
      article.quantite -= qte; // réduction visuelle temporaire
      article.quantiteAchetee = 1;

      this.panierService.updatePanierNonVide(utilisateurId);
    },
    error: () => alert("Erreur lors de l'ajout au panier")
  });
}



}