using BackendSecurite.Models;

public class PanierItem
{
    public int Id { get; set; }
    public int UtilisateurId { get; set; }
    public int ArticleId { get; set; }
    public int Quantite { get; set; }

  
    public Article? Article { get; set; }
}
