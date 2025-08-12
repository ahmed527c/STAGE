using BackendSecurite.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/panier")]
public class PanierController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PanierController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("ajouter")]
    public async Task<IActionResult> AjouterArticle([FromBody] PanierItem item)
    {
       

        // Vérifier si l'article existe déjà dans le panier de l'utilisateur
        var existingItem = await _context.PanierItems
            .FirstOrDefaultAsync(p => p.UtilisateurId == item.UtilisateurId && p.ArticleId == item.ArticleId);

        if (existingItem != null)
        {
            // Incrémenter la quantité
            existingItem.Quantite += item.Quantite;
            _context.PanierItems.Update(existingItem);
        }
        else
        {
            // Ajouter nouvel article au panier
            _context.PanierItems.Add(item);
        }

        await _context.SaveChangesAsync();

        return Ok();
    }


    [HttpGet("{utilisateurId}")]
    public async Task<IActionResult> GetPanier(int utilisateurId)
    {
        var panier = await _context.PanierItems
            .Include(p => p.Article)  // si tu veux détails article
            .Where(p => p.UtilisateurId == utilisateurId)
            .ToListAsync();

        return Ok(panier);
    }

    [HttpDelete("{utilisateurId}/article/{articleId}")]
    public async Task<IActionResult> SupprimerArticle(int utilisateurId, int articleId)
    {
        var item = await _context.PanierItems
            .FirstOrDefaultAsync(p => p.UtilisateurId == utilisateurId && p.ArticleId == articleId);

        if (item == null)
            return NotFound();

        // Remettre la quantité dans le stock
        var article = await _context.Articles.FindAsync(articleId);
     

        _context.PanierItems.Remove(item);
        await _context.SaveChangesAsync();

        return NoContent();
    }




    [HttpPost("confirmer/{utilisateurId}")]
    public async Task<IActionResult> ConfirmerAchat(int utilisateurId)
    {
        var panier = await _context.PanierItems
            .Include(p => p.Article)
            .Where(p => p.UtilisateurId == utilisateurId)
            .ToListAsync();


        // Regrouper par articleId et sommer les quantités
        var quantitesParArticle = panier
            .GroupBy(p => p.ArticleId)
            .Select(g => new
            {
                ArticleId = g.Key,
                QuantiteTotale = g.Sum(x => x.Quantite),
                Article = g.First().Article
            })
            .ToList();

        // Vérifier stock suffisant pour chaque article
        foreach (var q in quantitesParArticle)
        {
            if (q.QuantiteTotale > q.Article.Quantite)
            {
                return BadRequest($"Stock insuffisant pour l'article : {q.Article.Titre}");
            }
        }

        // Soustraire la quantité totale du stock pour chaque article
        foreach (var q in quantitesParArticle)
        {
            q.Article.Quantite -= q.QuantiteTotale;
        }

        // Supprimer tous les articles du panier
        _context.PanierItems.RemoveRange(panier);

        await _context.SaveChangesAsync();
        return Ok("Achat confirmé avec succès !");
    }


}