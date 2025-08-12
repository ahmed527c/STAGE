using BackendSecurite.Models;

public class ServiceRequest
{
    public int Id { get; set; }
    public int UtilisateurId { get; set; }

    public string ServiceType { get; set; }
    public string Nom { get; set; }
    public string Email { get; set; }
    public string Telephone { get; set; }
    public string Adresse { get; set; }
    public string Paiement { get; set; }
    public string Urgence { get; set; }
    public string Message { get; set; }

    public Utilisateur? Utilisateur { get; set; }
}
