namespace BackendSecurite.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Titre { get; set; }
        public string Type { get; set; }
        public double PrixAvant { get; set; }
        public double PrixApres { get; set; }
        public int Quantite { get; set; }
        public string Image { get; set; }
    }
}
